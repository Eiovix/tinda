import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { createUserValidator } from '#validators/user'
import UserProfile from '#models/user_profile'
export default class UsersController {
  public async login({ auth, response, request }: HttpContext) {
    const { email, password } = request.all()

    try {
      const user = await User.verifyCredentials(email, password)
      const token = await User.accessTokens.create(
        user,
        ['*'], // with all abilities
        {
          expiresIn: '30 days', // expires in 30 days
        }
      )
      const profile = await UserProfile.query().where('user_id', user.id).first()

      const data = {
        user,
        profile,
        token,
      }

      return response.status(200).json({
        message: 'Login successful.',
        data,
      })
    } catch (error) {
      console.log('Login error:', error)
      return response.status(401).json({
        message: 'Invalid email or password.',
      })
    }
  }

  public async logout({ auth, response }: HttpContext) {
    try {
      const user = auth.user!
      console.log('user', auth.user)
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
      return response.status(200).json({
        message: 'Logout successful.',
      })
    } catch (error) {
      console.log('Logout error:', error)
      return response.status(401).json({
        message: 'An error occurred while logging out.',
      })
    }
  }

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

  public async profile({ auth, response }: HttpContext) {
    const user = auth.user!

    const profile = await UserProfile.query().where('user_id', user.id).first()
    const data = {
      user,
      profile,
    }

    return response.status(200).json({
      data,
    })
  }

  public async show({ response }: HttpContext) {
    response.send('Hello world')
  }

  public async update({ response }: HttpContext) {
    response.send('Hello world')
  }
}
