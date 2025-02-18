import type { HttpContext } from '@adonisjs/core/http'
import { Application } from '@adonisjs/core/app'
import UserProfile from '#models/user_profile'
import { CreateUserProfileValidator } from '#validators/user_profile'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

export default class UserProfilesController {
  public async store({ request, response }: HttpContext) {
    // Validate input
    const payload = await CreateUserProfileValidator.validate(request.all())

    // Define public upload directories
    const profilePicDir = Application.publicPath('uploads/profile_pictures')
    const coverPhotoDir = Application.publicPath('uploads/cover_photos')

    // Ensure directories exist
    if (!fs.existsSync(profilePicDir)) fs.mkdirSync(profilePicDir, { recursive: true })
    if (!fs.existsSync(coverPhotoDir)) fs.mkdirSync(coverPhotoDir, { recursive: true })

    let profilePicturePath: string | null = null
    let coverPhotoPath: string | null = null

    // Handle profile picture upload
    const profilePicture = request.file('profile_picture', {
      extnames: ['jpg', 'png', 'jpeg'],
      size: '2mb',
    })

    if (profilePicture) {
      const fileName = `${new Date().getTime()}-profile.${profilePicture.extname}`
      const filePath = path.join(profilePicDir, fileName)

      await sharp(profilePicture.tmpPath!)
        .resize(300, 300) // Resize to 300x300
        .toFile(filePath)

      profilePicturePath = `uploads/profile_pictures/${fileName}`
    }

    // Handle cover photo upload
    const coverPhoto = request.file('cover_photo', {
      extnames: ['jpg', 'png', 'jpeg'],
      size: '2mb',
    })

    if (coverPhoto) {
      const fileName = `${new Date().getTime()}-cover.${coverPhoto.extname}`
      const filePath = path.join(coverPhotoDir, fileName)

      await sharp(coverPhoto.tmpPath!)
        .resize(1200, 600) // Resize to 1200x600
        .toFile(filePath)

      coverPhotoPath = `uploads/cover_photos/${fileName}`
    }

    // Create user profile
    const userProfile = await UserProfile.create({
      ...payload,
      profilePicture: profilePicturePath,
      coverPhoto: coverPhotoPath,
    })

    return response.status(201).json({
      message: 'Profile created successfully.',
      profile: {
        ...userProfile.toJSON(),
        profilePictureUrl: profilePicturePath
          ? `${request.protocol()}://${request.host()}/${profilePicturePath}`
          : null,
        coverPhotoUrl: coverPhotoPath
          ? `${request.protocol()}://${request.host()}/${coverPhotoPath}`
          : null,
      },
    })
  }
}
