import Media from '#models/media'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { MediaService } from '#services/media_service'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    // const mediaService = new MediaService()
    // const imgUrl =
    //   'https://www.akc.org/wp-content/uploads/2017/11/Affenpinscher-running-outdoors.jpg'
    // await mediaService.processImage(imgUrl, 'public/uploads/profile_pictures', 'profile')
    // await Media.createMany([
    //   {
    //     name: 'profile',
    //     alternativeText: 'Profile picture',
    //     caption: 'Profile picture',
    //     hash: 'profile',
    //     ext: 'jpg',
    //     mime: 'image/jpeg',
    //     size: 1000,
    //     url: 'uploads/profile_pictures/1-profile.jpg',
    //     provider: 'local',
    //     width: 200,
    //     height: 200,
    //   },
    // ])
  }
}
