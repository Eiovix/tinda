import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ProductVariation extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare product_id: number

  @column()
  declare variation_id: number

  @column()
  declare media: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
