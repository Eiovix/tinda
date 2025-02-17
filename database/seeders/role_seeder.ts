import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Role from '#models/role'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Role.createMany([
      {
        name: 'admin',
        description: 'Developers account.',
        permissions: ['*'], // All permissions
      },
      {
        name: 'employee',
        description: 'Employee account.',
        permissions: ['store_view', 'store_edit'],
      },
      {
        name: 'store_owner',
        description: 'Store owner account.',
        permissions: [
          'store_create',
          'store_edit',
          'store_product_view',
          'store_product_create',
          'store_product_edit',
          'store_product_delete',
        ],
      },
    ])
  }
}
