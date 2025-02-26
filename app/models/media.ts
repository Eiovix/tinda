import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Media extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare uuid: string

  @column()
  declare name: string

  @column()
  declare alternativeText: string

  @column()
  declare caption: string

  @column()
  declare width: number

  @column()
  declare height: number

  @column({
    prepare: (value: object) => JSON.stringify(value),
    consume: (value: string) => JSON.parse(value),
  })
  declare formats: object

  @column()
  declare hash: string

  @column()
  declare ext: string

  @column()
  declare mime: string

  @column()
  declare size: number

  @column()
  declare url: string

  @column()
  declare provider: string

  @column()
  declare provider_metadata: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
