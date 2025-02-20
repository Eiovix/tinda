import UserRole from '#models/user_role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await UserRole.createMany([
      {
        user_id: 1,
        role_id: 1,
      },
    ])
  }
}
