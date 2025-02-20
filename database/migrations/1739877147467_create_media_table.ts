import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'media'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.string('alternative_text').nullable()
      table.string('caption').nullable()
      table.integer('width').notNullable()
      table.integer('height').notNullable()
      table.json('formats').nullable()
      table.string('hash').notNullable()
      table.string('ext').notNullable()
      table.string('mime').notNullable()
      table.integer('size').notNullable()
      table.string('url').notNullable()
      table.string('provider').notNullable()
      table.json('provider_metadata').nullable()

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
