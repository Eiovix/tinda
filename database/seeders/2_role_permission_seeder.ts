import { BaseSeeder } from '@adonisjs/lucid/seeders'
import RolePermission from '#models/role_permission'
import Role from '#models/role'
import Permission from '#models/permission'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  private async assignPermissionsToRole(roleId: number, permissions: Permission[]) {
    const adminRolePermissions = permissions.map((permission) => ({
      role_id: roleId,
      permission_id: permission.id,
      created_at: DateTime.now(),
      updated_at: DateTime.now(),
    }))

    const employeePermissions = [2, 5, 6]
    const storeOwnerPermissions = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

    const employeeRolePermissions = employeePermissions.map((permission) => ({
      role_id: 2,
      permission_id: permission,
      created_at: DateTime.now(),
      updated_at: DateTime.now(),
    }))

    const storeOwnerRolePermissions = storeOwnerPermissions.map((permission) => ({
      role_id: 3,
      permission_id: permission,
      created_at: DateTime.now(),
      updated_at: DateTime.now(),
    }))

    try {
      await RolePermission.createMany([
        ...adminRolePermissions,
        ...employeeRolePermissions,
        ...storeOwnerRolePermissions,
      ])
    } catch (error) {
      console.error('Failed to assign permissions:', error)
      throw error
    }
  }

  async run() {
    try {
      const allRoles = await Role.all()
      const allPermissions = await Permission.all()

      if (allRoles?.length > 0 && allPermissions?.length > 0) {
        await this.assignPermissionsToRole(1, allPermissions)
      }
    } catch (error) {
      console.error('Seeder failed:', error)
      throw error
    }
  }
}
