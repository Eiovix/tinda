import Media from '#models/media'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import axios from 'axios'
import FormData from 'form-data'

export default class extends BaseSeeder {
  async run() {
    try {
      const formData = new FormData()
      const imageUrl =
        'https://www.akc.org/wp-content/uploads/2017/11/Affenpinscher-running-outdoors.jpg'
      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' })
      formData.append('media', Buffer.from(imageResponse.data), 'dog.jpg')

      await axios.post('http://localhost:3333/api/v1/media', formData, {
        headers: {
          ...formData.getHeaders(),
          Accept: 'application/json',
        },
      })
      console.log('Media created successfully')
    } catch (error) {
      console.log('error', error)
    }
  }
}
