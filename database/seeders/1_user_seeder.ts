import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/User'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      {
        email: 'test@test.com',
        username: 'diomenike',
        password: '1',
        is_verified: true,
      },
    ])
  }
}
