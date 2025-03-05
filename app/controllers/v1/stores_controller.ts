import { createStoreValidator } from '#validators/store'
import type { HttpContext } from '@adonisjs/core/http'
import Store from '#models/store'

export default class StoresController {
  public async store({ request, response }: HttpContext) {
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
    const store = await Store.create(payload)

    // Fetch the newly created store with related store_logo
    await store.load('store_logo')

    return response.status(201).json({
      message: 'Store created successfully.',
      data: store,
    })
  }
}
