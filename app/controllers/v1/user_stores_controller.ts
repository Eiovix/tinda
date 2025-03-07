import Role from '#models/role'
import UserStore from '#models/user_store'
import type { HttpContext } from '@adonisjs/core/http'

export default class UserStoresController {
  public async storeUsers({ request, response }: HttpContext) {
    const storeId = request.param('store_id')
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    // Fetch users and preload their profiles
    const users = await UserStore.query()
      .select([
        'user_stores.id',
        'user_stores.user_id',
        'user_stores.store_id',
        'user_stores.created_at',
        'user_stores.updated_at',
      ])
      .where('store_id', storeId)
      .groupBy('user_stores.user_id')
      .preload('user')
      .preload('profile')
      .paginate(page, limit)

    let usersJson = users.toJSON()

    // Fetch all user roles in a single query
    const userIds = usersJson.data.map((user) => user.user_id)
    const userRoles = await UserStore.query()
      .whereIn('user_id', userIds)
      .where('store_id', storeId)
      .select(['user_id', 'role_id'])

    // Fetch all roles in a single query
    const roleIds = [...new Set(userRoles.map((ur) => ur.role_id))] // Unique role IDs
    const roles = await Role.query().whereIn('id', roleIds)

    // Ensure roles are properly assigned
    usersJson.data = usersJson.data.map((user) => {
      return {
        ...user,
        roles: userRoles
          .filter((ur) => ur.user_id === user.user_id)
          .map((ur) => roles.find((role) => role.id === ur.role_id))
          .filter((role) => role !== undefined), // Remove undefined values
      }
    })

    console.log('Modified usersJson:', JSON.stringify(usersJson, null, 2))

    return response.json(usersJson)
  }
}
