import Media from '#models/media'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { MediaService } from '#services/media_service'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const mediaService = new MediaService()

    const imgUrl =
      'https://www.akc.org/wp-content/uploads/2017/11/Affenpinscher-running-outdoors.jpg'

    await mediaService.processImage(imgUrl, 'public/uploads/profile_pictures', 'profile')

    // await Media.createMany([
    //   {
    //     name: 'profile',
    //     width: 200,
    //     height: 200,
    //     style: 'crop',
    //     quality: 100,
    //   },
    // ])
  }
}
