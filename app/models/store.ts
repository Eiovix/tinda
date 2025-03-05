import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'
import Media from '#models/media'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
export default class Store extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare store_name: string

  @column()
  declare store_phone: string

  @column()
  declare store_slug: string

  @column({ prepare: (value: string) => value || uuidv4() })
  declare uuid: string

  @column()
  declare store_email: string

  @column()
  declare store_logo: number

  @column()
  declare store_banner: number

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /** Relationships */
  @belongsTo(() => Media, { foreignKey: 'store_logo' })
  public storeLogo!: BelongsTo<typeof Media> | null

  @belongsTo(() => Media, { foreignKey: 'store_banner' })
  public storeBanner!: BelongsTo<typeof Media> | null
}
