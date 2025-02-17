import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/user'
export default class UsersController {
  public async index({ response, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const users = await User.query().paginate(page, limit)
    response.status(200).json(users)
  }

  public async store({ response, request }: HttpContext) {
    const data = request.all()
    const payload = await createUserValidator.validate(data)

    const { password_confirmation, ...userData } = payload
    await User.create(userData)

    return response.status(201).json({
      message: 'User created successfully.',
    })
  }

  public async show({ response }: HttpContext) {
    response.send('Hello world')
  }

  public async update({ response }: HttpContext) {
    response.send('Hello world')
  }
}
