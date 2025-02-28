import { createStoreValidator } from '#validators/store'
import type { HttpContext } from '@adonisjs/core/http'
import Store from '#models/store'
export default class StoresController {
  public async store({ request, response }: HttpContext) {
    const payload = await createStoreValidator.validate(request.all())
    const store = await Store.create(payload)

    const latestStore = await Store.query().orderBy('created_at', 'desc').firstOrFail()

    return response.status(201).json({ message: 'Store created.', data: latestStore })
  }
}
