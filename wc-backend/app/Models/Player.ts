import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Team from './Team'

export default class Player extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column()
  public footballApiId: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
