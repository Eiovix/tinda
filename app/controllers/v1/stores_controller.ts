import { createStoreValidator } from '#validators/store'
import type { HttpContext } from '@adonisjs/core/http'
import Store from '#models/store'
import UserStore from '#models/user_store'
export default class StoresController {
  public async store({ request, response, auth }: HttpContext) {
    // Get validated data first
    const payload = await createStoreValidator.validate(request.all())

    // Generate slug from input
    let slug = request.input('store_slug', '') // Ensure slug exists

    slug = slug
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Convert spaces to dashes
      .replace(/-+/g, '-') // Remove consecutive dashes

    // Ensure slug is included in payload
    payload.store_slug = slug

    // Insert into the database
    let store = await Store.create(payload)
    const user = await auth.authenticate()
    await UserStore.create({
      user_id: user.id,
      store_id: store.id,
      role_id: 3,
    })

    await store.load('storeLogo')
    if (store.store_banner) {
      await store.load('storeBanner')
    }
    return response.status(201).json({
      message: 'Store created successfully.',
      data: store,
    })
  }
}
