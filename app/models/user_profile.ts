import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

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
  public profilePicture: string | null = null

  @column()
  public coverPhoto: string | null = null

  @column()
  public userId: number | null = null

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}
