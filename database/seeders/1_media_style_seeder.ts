import { BaseSeeder } from '@adonisjs/lucid/seeders'
import MediaStyle from '#models/media_style'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    MediaStyle.createMany([
      {
        name: 'thumbnail',
        width: 150,
        height: 150,
        style: 'inside',
        quality: 100,
      },
      {
        name: 'small',
        width: 300,
        height: 300,
        style: 'inside',
        quality: 100,
      },
      {
        name: 'medium',
        width: 500,
        height: 500,
        style: 'inside',
        quality: 100,
      },
      {
        name: 'large',
        width: 1024,
        height: 1024,
        style: 'inside',
        quality: 100,
      },
    ])
  }
}
