import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasOne, manyToMany } from '@adonisjs/lucid/orm'

import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Role from './role.js'
import UserProfile from './user_profile.js'
import type { HasMany, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import UserRole from './user_role.js'
export default class UserStore extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare user_id: number

  @column()
  declare store_id: number

  @column()
  declare role_id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'user_id' })
  public user!: BelongsTo<typeof User> | null

  @belongsTo(() => UserProfile, { foreignKey: 'user_id' })
  public profile!: BelongsTo<typeof UserProfile> | null
}
