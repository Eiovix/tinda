import { BaseSchema } from '@adonisjs/lucid/schema'

export default class Profiles extends BaseSchema {
  protected tableName = 'user_profiles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('first_name').notNullable()
      table.string('middle_name').nullable()
      table.string('last_name').notNullable()
      table
        .integer('profile_picture')
        .unsigned()
        .references('id')
        .inTable('media')
        .onDelete('CASCADE')
      table.integer('cover_photo').unsigned().references('id').inTable('media').onDelete('CASCADE')

      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .unique()
      table.timestamp('created_at', { useTz: true }).defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).defaultTo(this.now())
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
