import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Team from './Team'
import Player from './Player'
import Fixture from './Fixture'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public time_elapsed: number

  @column()
  public time_elapsed_extra: number | null

  @column()
  public type: 'goal' | 'card' | 'subst'

  @hasOne(() => Team, {
    localKey: 'teamId',
    foreignKey: 'id',
  })
  public team: HasOne<typeof Team>

  @column()
  public teamId: number

  @hasOne(() => Player, {
    localKey: 'playerId',
    foreignKey: 'id',
  })
  public player: HasOne<typeof Player> | null

  @column()
  public playerId: number

  @column()
  public playerName: string

  @hasOne(() => Player, {
    localKey: 'assistId',
    foreignKey: 'id',
  })
  public assist: HasOne<typeof Player>

  @column()
  public assistId: number | null

  @column()
  public assistName: string | null

  @hasOne(() => Fixture, {
    localKey: 'fixtureId',
    foreignKey: 'id',
  })
  public fixture: HasOne<typeof Fixture>

  @column()
  public fixtureId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
