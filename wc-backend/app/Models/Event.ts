import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Team from './Team.js'
import Player from './Player.js'
import Fixture from './Fixture.js'
import { EventDto } from '../../../shared-types/fixtures-dto.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Event extends BaseModel {
  public async updateFromFootballApi(event: any, fixtureId: number) {
    const team = await Team.findBy('footballApiId', event.team.id)
    const player = await Player.findBy('footballApiId', event.player.id)
    const assist = await Player.findBy('footballApiId', event.assist?.id)

    if (!team) {
      console.error(`Team with footballApiId ${event.team.id} not found`)
    }

    if (!player && event.player.id !== null) {
      console.error(`Player with footballApiId ${event.player.id} not found`)
    }

    if (event.assist?.id && !assist) {
      console.error(`Player with footballApiId ${event.assist.id} not found`)
    }

    this.time_elapsed = event.time.elapsed
    this.time_elapsed_extra = event.time.extra
    this.detail = event.detail
    this.type = event.type.toLowerCase()
    this.teamId = team!.id
    this.playerId = player!.id
    this.assistId = assist!.id
    this.fixtureId = fixtureId
  }

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
