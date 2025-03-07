import { createStoreValidator } from '#validators/store'
import type { HttpContext } from '@adonisjs/core/http'
import Store from '#models/store'
import UserStore from '#models/user_store'
import { v4 as uuidv4 } from 'uuid'

export default class StoresController {
  public async store({ request, response, auth }: HttpContext) {
    // Get validated data first
    const payload = await createStoreValidator.validate(request.all())
    const uuid = uuidv4()
    // Generate slug from input
    let slug = request.input('store_slug', '') // Ensure slug exists

    slug = slug
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Convert spaces to dashes
      .replace(/-+/g, '-') // Remove consecutive dashes

    // Ensure slug and uuid are included in payload
    payload.store_slug = slug
    payload.uuid = uuid // Add this line to include uuid

    // Insert into the database
    let store = await Store.create(payload)

    const user = await auth.authenticate()
    await UserStore.create({
      user_id: user.id,
      store_id: store.id,
      role_id: 3,
    })

    await store.load('storeLogo')
    await store.load('storeBanner')

    return response.status(201).json({
      message: 'Store created successfully.',
      data: store,
    })
  }

  public async sellerStoreIndex({ request, response }: HttpContext) {
    const uuid = request.param('uuid')

    const store = await Store.query().where('uuid', uuid).firstOrFail()
    await store.load('storeLogo')
    await store.load('storeBanner')
    return response.json(store)
  }
}
