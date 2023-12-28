import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Team from './Team'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  public time_elapsed: number
  public time_elapsed_extra: number | null

  public type: 'goal' | 'card' | 'subst'

  @hasOne(() => Team, {
    localKey: 'homeTeamId',
    foreignKey: 'id',
  })
  public team: HasOne<typeof Team>

  public team_id: number

  public player_id: number | null

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
