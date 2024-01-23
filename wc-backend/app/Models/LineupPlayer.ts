import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Player from './Player'
import Team from './Team'
import Fixture from './Fixture'
import { LineupPlayerDto } from '../../../shared-types/fixtures-dto'

export default class LineupPlayer extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @hasOne(() => Player, {
    localKey: 'playerId',
    foreignKey: 'id',
  })
  public player: HasOne<typeof Player>

  @column()
  public playerId: number

  @hasOne(() => Team, {
    localKey: 'teamId',
    foreignKey: 'id',
  })
  public team: HasOne<typeof Team>

  @column()
  public teamId: number

  @hasOne(() => Fixture, {
    localKey: 'fixtureId',
    foreignKey: 'id',
  })
  public fixture: HasOne<typeof Fixture>

  @column()
  public fixtureId: number

  @column()
  public playerNumber: number

  @column()
  public playerName: string

  @column()
  public substitute: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public toDto(): LineupPlayerDto {
    return {
      id: this.id,
      playerId: this.playerId,
      teamId: this.teamId,
      fixtureId: this.fixtureId,
      playerNumber: this.playerNumber,
      playerName: this.playerName,
      substitute: this.substitute,
    }
  }
}
