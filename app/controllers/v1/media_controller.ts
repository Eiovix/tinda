import type { HttpContext } from '@adonisjs/core/http'
import { schema, rules } from '@adonisjs/validator'
import drive from '@adonisjs/drive/services/main'
import { cuid } from '@adonisjs/core/helpers'
import sharp from 'sharp'
import fs from 'fs/promises'
import MediaStyle from '#models/media_style'
import Media from '#models/media'
export default class MediaController {
  async store({ request, response }: HttpContext) {
    try {
      // Get uploaded file(s)
      let mediaFiles = request.files('media')

      if (!mediaFiles || (Array.isArray(mediaFiles) && mediaFiles.length === 0)) {
        return response.badRequest({ error: 'No media files uploaded' })
      }
      // Ensure mediaFiles is always an array
      if (!Array.isArray(mediaFiles)) {
        mediaFiles = [mediaFiles] as typeof mediaFiles
      }
      if (mediaFiles.length > 1) {
        await request.validate({
          schema: schema.create({
            media: schema.array().members(
              schema.file({
                size: '10mb',
                extnames: ['jpg', 'png', 'jpeg', 'webp'],
              })
            ),
          }),
        })
      } else {
        await request.validate({
          schema: schema.create({
            media: schema.file.optional({
              size: '10mb',
              extnames: ['jpg', 'png', 'jpeg', 'webp'],
            }),
          }),
        })
      }

      const results = []

      for (const image of mediaFiles) {
        if (!image.tmpPath) {
          continue
        }

        const baseKey = cuid()
        const ext = image.extname
        const buffer = await fs.readFile(image.tmpPath)
        const metadata = await sharp(buffer).metadata()

        // Fetch image sizes from MediaStyle model
        const imageSizes = await MediaStyle.all()
        const sizes = imageSizes.reduce(
          (acc, imageSize) => ({
            ...acc,
            [imageSize.name]: {
              width: imageSize.width,
              height: imageSize.height,
              quality: imageSize.quality,
              style: imageSize.style,
            },
          }),
          {}
        )

        const urls: Record<string, string> = {}

        for (const [size, dimensions] of Object.entries(sizes) as [
          string,
          {
            style: string
            hash: string
            ext: string
            mime: string
            url: string
            provider: string
            size: number
            width: number
            height: number
            formats: string
          },
        ][]) {
          const resizedBuffer = await sharp(buffer)
            .resize(dimensions.width, dimensions.height, {
              fit: dimensions.style as keyof sharp.FitEnum,
              position: 'center',
            })
            .toBuffer()

          const key = `${baseKey}-${size}.${ext}`
          await drive.use().put(key, resizedBuffer)
          urls[size] = await drive.use().getUrl(key)
        }

        // Store original image
        const originalKey = `${baseKey}-original.${ext}`
        await drive.use().put(originalKey, buffer)
        urls['original'] = await drive.use().getUrl(originalKey)

        const media = await Media.create({
          name: image.clientName,
          size: image.size,
          ext: image.extname,
          hash: baseKey,
          width: metadata.width,
          height: metadata.height,
          mime: image.type,
          url: urls['original'],
          provider: 'local',
          formats: JSON.stringify(urls),
        })

        results.push({
          id: media,
          formats: urls,
        })
      }

      return response.ok({
        message: 'Images uploaded and resized successfully',
        results,
      })
    } catch (error) {
      if (error.status === 422) {
        return response.status(422).send(error.messages)
      }

      return response.badRequest({ error: error.message })
    }
  }
}
