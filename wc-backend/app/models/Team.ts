import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Team extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @column()
  public footballApiId!: number

  @column()
  public name!: string

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime
}
