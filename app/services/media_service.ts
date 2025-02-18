import path from 'path'
import sharp from 'sharp'
import axios from 'axios'

interface ImageSize {
  width: number
  height: number
}

interface ImageSizes {
  [key: string]: ImageSize
}

class ImageProcessor {
  private readonly imageSizes: ImageSizes = {
    mobile: { width: 320, height: 240 },
    tablet: { width: 768, height: 576 },
    laptop: { width: 1024, height: 768 },
    desktop: { width: 1920, height: 1080 },
  }

  private async fetchImageBuffer(url: string): Promise<Buffer> {
    const response = await axios.get(url, { responseType: 'arraybuffer' })
    return Buffer.from(response.data)
  }

  private async processImage(buffer: Buffer, size: ImageSize, outputPath: string): Promise<void> {
    await sharp(buffer)
      .resize(size.width, size.height, {
        fit: 'cover',
        position: 'center',
      })
      .jpeg({ quality: 80 })
      .toFile(outputPath)
  }

  async generateImages(url: string, dir: string, prefix: string): Promise<string> {
    try {
      await import('fs').then((fs) => fs.promises.mkdir(dir, { recursive: true }))
      const buffer = await this.fetchImageBuffer(url)
      const timestamp = Date.now()
      const paths: string[] = []

      for (const [size, dimensions] of Object.entries(this.imageSizes)) {
        const fileName = `${timestamp}-${prefix}-${size}.jpg`
        const filePath = path.join(dir, fileName)

        await this.processImage(buffer, dimensions, filePath)
        paths.push(`uploads/${path.basename(dir)}/${fileName}`)
      }

      return JSON.stringify(paths)
    } catch (error) {
      console.error(`Failed to process ${prefix} image:`, error)
      return ''
    }
  }
}

export class MediaService {
  // Your code here
  async processImage(url: string, dir: string, prefix: string): Promise<string> {
    const imageProcessor = new ImageProcessor()
    return imageProcessor.generateImages(url, dir, prefix)
  }
}
