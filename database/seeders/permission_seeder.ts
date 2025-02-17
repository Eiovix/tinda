import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Permission from '#models/permission'
import { DateTime } from 'luxon'
export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Permission.createMany([
      // User Management
      {
        name: 'user_create',
        description: 'Create a new user',
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO(),
      },
      {
        name: 'user_edit',
        description: 'Edit an existing user',
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO(),
      },
      {
        name: 'user_delete',
        description: 'Delete an existing user',
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO(),
      },

      // Store Management
      {
        name: 'store_create',
        description: 'Create a new product in a store',
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO(),
      },
      {
        name: 'store_edit',
        description: 'Edit a store',
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO(),
      },
      {
        name: 'store_delete',
        description: 'Delete a store',
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO(),
      },

      // Tenant Store permissions
      {
        name: 'store_product_create',
        description: 'Create a new product in a store',
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO(),
      },
      {
        name: 'store_product_edit',
        description: 'Edit products in a store',
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO(),
      },
      {
        name: 'store_product_delete',
        description: 'Delete products in a store',
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO(),
      },
      {
        name: 'store_user_create',
        description: 'Create a new user in a store',
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO(),
      },
      {
        name: 'store_user_edit',
        description: 'Edit user in a store',
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO(),
      },
      {
        name: 'store_user_delete',
        description: 'Delete user in a store',
        createdAt: DateTime.now().toISO(),
        updatedAt: DateTime.now().toISO(),
      },
    ])
  }
}
