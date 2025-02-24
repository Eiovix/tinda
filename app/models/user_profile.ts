import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Media from '#models/media'

export default class UserProfile extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public firstName!: string

  @column()
  public middleName?: string | null

  @column()
  public lastName!: string

  @column()
  public profilePicture?: number | null

  @column()
  public coverPhoto?: number | null

  @column()
  public userId?: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  /** Relationships */
  @belongsTo(() => Media, { foreignKey: 'profilePicture' })
  public profile_picture!: BelongsTo<typeof Media> // Removed `undefined` and made it non-optional

  @belongsTo(() => Media, { foreignKey: 'coverPhoto' })
  public cover_photo!: BelongsTo<typeof Media> // Removed `undefined` and made it non-optional
}
