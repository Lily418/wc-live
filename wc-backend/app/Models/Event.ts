import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, HasOne, belongsTo, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Team from './Team'
import Player from './Player'
import Fixture from './Fixture'
import { EventDto } from '../../../shared-types/fixtures-dto'

export default class Event extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public time_elapsed: number

  @column()
  public time_elapsed_extra: number | null

  @column()
  public type: 'goal' | 'card' | 'subst'

  @belongsTo(() => Team, {
    localKey: 'id',
    foreignKey: 'teamId',
  })
  public team: BelongsTo<typeof Team>

  @column()
  public teamId: number

  @belongsTo(() => Player, {
    localKey: 'id',
    foreignKey: 'playerId',
  })
  public player: BelongsTo<typeof Player>

  @column()
  public playerId: number

  @column()
  public playerName: string

  @belongsTo(() => Player, {
    localKey: 'id',
    foreignKey: 'assistId',
  })
  public assist: BelongsTo<typeof Player>

  @column()
  public assistId: number | null

  @column()
  public assistName: string | null

  @belongsTo(() => Fixture, {
    localKey: 'id',
    foreignKey: 'fixtureId',
  })
  public fixture: BelongsTo<typeof Fixture>

  @column()
  public fixtureId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public detail: string | null

  public toDto(): EventDto {
    return {
      id: this.id,
      time_elapsed: this.time_elapsed,
      time_elapsed_extra: this.time_elapsed_extra,
      type: this.type,
      teamId: this.teamId,
      playerId: this.playerId,
      playerName: this.player?.name || this.playerName,
      assistId: this.assistId,
      assistName: this.assist?.name || this.assistName,
      fixtureId: this.fixtureId,
      detail: this.detail,
    }
  }
}
