import { DateTime } from 'luxon'
import { BaseModel, HasMany, HasOne, column, hasMany, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Team from './Team'
import Event from './Event'
import { FixtureDto, FixtureSummaryDto } from '../../../shared-types/fixtures-dto'
import LineupPlayer from './LineupPlayer'
import LineupCoach from './LineupCoach'

// export type FixtureStatus =
//   | 'FT'
//   | 'NS'
//   | '1H'
//   | 'HT'
//   | '2H'
//   | 'ET'
//   | 'BT'
//   | 'P'
//   | 'SUSP'
//   | 'INT'
//   | 'FT'
//   | 'AET'
//   | 'PEN'
//   | 'PST'
//   | 'CANC'
//   | 'ABD'
//   | 'AWD'
//   | 'WO'
//   | 'LIVE'

export default class Fixture extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public footballApiId: number

  @hasOne(() => Team, {
    localKey: 'homeTeamId',
    foreignKey: 'id',
  })
  public homeTeam: HasOne<typeof Team>

  @hasOne(() => Team, {
    localKey: 'awayTeamId',
    foreignKey: 'id',
  })
  public awayTeam: HasOne<typeof Team>

  @hasMany(() => Event, {
    localKey: 'id',
    foreignKey: 'fixtureId',
  })
  public events: HasMany<typeof Event>

  @hasMany(() => LineupPlayer, {
    localKey: 'id',
    foreignKey: 'fixtureId',
  })
  public lineupPlayers: HasMany<typeof LineupPlayer>

  @hasMany(() => LineupCoach, {
    localKey: 'id',
    foreignKey: 'fixtureId',
  })
  public lineupCoaches: HasMany<typeof LineupCoach>

  @column()
  public homeTeamId: number

  @column()
  public awayTeamId: number

  @column()
  public homeTeamScore: number | null

  @column()
  public awayTeamScore: number | null

  @column.dateTime()
  public kickoff: DateTime

  // Statues as per https://www.api-football.com/documentation-v3#tag/Fixtures/operation/get-fixtures
  @column()
  public status: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public toSummaryDto(): FixtureSummaryDto {
    return {
      id: this.id,
      home_team_football_api_id: this.homeTeam.footballApiId,
      away_team_football_api_id: this.awayTeam.footballApiId,
      home_team_score: this.homeTeamScore,
      away_team_score: this.awayTeamScore,
      away_team: {
        name: this.awayTeam.name,
      },
      home_team: {
        name: this.homeTeam.name,
      },
      kickoff: this.kickoff.toISO(),
    }
  }

  public toDto(): FixtureDto {
    return {
      ...this.toSummaryDto(),
      events: this.events.map((event) => event.toDto()),
      lineupPlayers: this.lineupPlayers.map((lineupPlayer) => lineupPlayer.toDto()),
      lineupCoaches: this.lineupCoaches.map((lineupCoach) => lineupCoach.toDto()),
    }
  }
}
