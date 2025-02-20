import UserProfile from '#models/user_profile'

export class UserProfileService {
  // Your code here
  async findProfile(userId: number) {
    // Your code here
    const profile = await UserProfile.query().where('user_id', userId).firstOrFail()

    return profile
  }
}
