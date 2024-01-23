import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Fixture from './Fixture'
import Team from './Team'

export default class LineupCoach extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Fixture, {
    localKey: 'fixtureId',
    foreignKey: 'id',
  })
  public fixture: HasOne<typeof Fixture>

  @column()
  public fixtureId: number

  @hasOne(() => Team, {
    localKey: 'teamId',
    foreignKey: 'id',
  })
  public team: HasOne<typeof Team>

  @column()
  public teamId: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
