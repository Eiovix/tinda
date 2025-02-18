import { DateTime } from 'luxon'
import { BaseModel, column, computed } from '@adonisjs/lucid/orm'
// import Env from '@ioc:Adonis/Core/Env'
import Env from '#start/env'
export default class UserProfile extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public firstName!: string

  @column()
  public middleName: string | null = null

  @column()
  public lastName!: string

  @column()
  public profilePicture: number | null = null

  @column()
  public coverPhoto: number | null = null

  @column()
  public userId: number | null = null

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  // Compute image URLs dynamically
  @computed()
  public get profilePictureUrl() {
    return this.profilePicture
      ? `${Env.get('APP_URL')}/uploads/profile_pictures/${this.profilePicture}`
      : null
  }

  @computed()
  public get coverPhotoUrl() {
    return this.coverPhoto ? `${Env.get('APP_URL')}/uploads/cover_photos/${this.coverPhoto}` : null
  }
}
