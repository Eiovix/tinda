import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Role.createMany([
      {
        name: 'admin',
        description: 'Developers account.',
      },
      {
        name: 'employee',
        description: 'Employee account.',
      },
      {
        name: 'store_owner',
        description: 'Store owner account.',
      },
    ])
  }
}
