import type { HttpContext } from '@adonisjs/core/http'
import { schema } from '@adonisjs/validator'
import drive from '@adonisjs/drive/services/main'
import { cuid } from '@adonisjs/core/helpers'
import sharp from 'sharp'
import fs from 'fs/promises'
import MediaStyle from '#models/media_style'

export default class MediaController {
  async store({ request, response }: HttpContext) {
    try {
      // Validate multiple file upload
      const payload = await request.validate({
        schema: schema.create({
          avatar: schema.array().members(
            schema.file({
              size: '10mb',
              extnames: ['jpg', 'png', 'jpeg', 'webp'],
            })
          ),
        }),
      })

      const images = payload.avatar
      const results = []

      for (const image of images) {
        if (!image || !image.tmpPath) {
          continue
        }

        const baseKey = cuid()
        const ext = image.extname

        // Read the image file as a buffer
        const buffer = await fs.readFile(image.tmpPath)

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

        // Process and upload resized images
        for (const [size, dimensions] of Object.entries(sizes) as [
          string,
          { width: number; height: number; style: string },
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

        results.push({
          originalName: image.clientName,
          urls,
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
