import type { HttpContext } from '@adonisjs/core/http'
import UserProfile from '#models/user_profile'
export default class UserProfilesController {
  public async show({ request, response }: HttpContext) {
    try {
      const userProfile = await UserProfile.query()
        .where('user_id', request.params().id)
        .firstOrFail()
      return response.status(201).json(userProfile)
    } catch (error) {
      if (error.status === 404) {
        return response.status(404).json({ message: 'Profile not found.' })
      }
      return response.status(500).json({ message: 'Internal server error.' })
    }
  }
}
