import type { HttpContextContract } from '@adonisjs/core/http'
import Profile from '#models/user_profile'
import { schema, rules } from '@adonisjs/validator'

export default class ProfilesController {
  public async index({ request, response }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)

    const profiles = await Profile.query().paginate(page, limit)
    return response.ok(profiles)
  }

  public async store({ request, response }: HttpContextContract) {
    const profileSchema = schema.create({
      first_name: schema.string([rules.maxLength(255)]),
      middle_name: schema.string.optional([rules.maxLength(255)]),
      last_name: schema.string([rules.maxLength(255)]),
      profile_picture: schema.string.optional([rules.url()]),
      cover_photo: schema.string.optional([rules.url()]),
    })

    const data = await request.validate({ schema: profileSchema })
    const profile = await Profile.create(data)

    return response.created(profile)
  }

  public async show({ params, response }: HttpContextContract) {
    try {
      const profile = await Profile.findOrFail(params.id)
      return response.ok(profile)
    } catch {
      return response.notFound({ message: 'Profile not found' })
    }
  }

  public async update({ params, request, response }: HttpContextContract) {
    const profile = await Profile.findOrFail(params.id)

    const profileSchema = schema.create({
      first_name: schema.string.optional([rules.maxLength(255)]),
      middle_name: schema.string.optional([rules.maxLength(255)]),
      last_name: schema.string.optional([rules.maxLength(255)]),
      profile_picture: schema.string.optional([rules.url()]),
      cover_photo: schema.string.optional([rules.url()]),
    })

    const data = await request.validate({ schema: profileSchema })
    profile.merge(data)
    await profile.save()

    return response.ok(profile)
  }

  public async destroy({ params, response }: HttpContextContract) {
    const profile = await Profile.find(params.id)
    if (!profile) {
      return response.notFound({ message: 'Profile not found' })
    }

    await profile.delete()
    return response.ok({ message: 'Profile deleted successfully' })
  }
}
