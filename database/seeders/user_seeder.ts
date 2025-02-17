import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/User'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'test@test.com',
        password: '1',
      },
    ])
  }
}
