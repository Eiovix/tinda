import { BaseSchema } from '@adonisjs/lucid/schema'
import { v4 as uuidv4 } from 'uuid'
export default class extends BaseSchema {
  protected tableName = 'stores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('uuid').defaultTo(uuidv4()).notNullable()
      table.string('store_name').notNullable()
      table.string('store_phone').notNullable()
      table.string('store_email').notNullable()

      table.string('store_slug').notNullable().unique()

      table.integer('store_logo').unsigned().nullable()
      table.foreign('store_logo').references('id').inTable('media').onDelete('SET NULL')

      table.integer('store_banner').unsigned().nullable()
      table.foreign('store_banner').references('id').inTable('media').onDelete('SET NULL')

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
