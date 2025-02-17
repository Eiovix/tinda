import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user' // Ensure this path is correct
import UserProfile from '#models/user_profile' // Ensure this path is correct
import { DateTime } from 'luxon'
import UserSeeder from './user_seeder.js'
export default class UserProfileSeeder extends BaseSeeder {
  async run() {
    try {
      // Ensure users are seeded first
      await new UserSeeder().run()

      const users = await User.all()

      if (users.length === 0) {
        console.warn('No users found, skipping user_profiles seeder')
        return
      }

      // Insert profile data only if users exist
      await UserProfile.createMany([
        {
          firstName: 'Diome Nike',
          middleName: 'Sanchez',
          lastName: 'Potot',
          profilePicture: null,
          coverPhoto: null,
          userId: 1, // Assign the first user ID
          createdAt: DateTime.now().toISO(), // Convert DateTime to ISO string
          updatedAt: DateTime.now().toISO(),
        },
      ])
    } catch (error) {
      console.error('Error seeding user_profiles:', error.message)
      throw error
    }
  }
}
