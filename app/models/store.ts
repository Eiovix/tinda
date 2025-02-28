import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from 'uuid'
export default class Store extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column()
  declare store_name: string

  @column()
  declare store_phone: string

  @column({ prepare: (value: string) => value || uuidv4() })
  declare uuid: string

  @column()
  declare store_email: string

  @column()
  declare slug: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
