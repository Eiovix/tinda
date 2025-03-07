import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_stores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .nullable()
      table
        .integer('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
        .onDelete('CASCADE')
        .nullable()
      table
        .integer('role_id')
        .unsigned()
        .references('id')
        .inTable('roles')
        .onDelete('CASCADE')
        .nullable()

      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
