import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Team from './Team.js'
import Event from './Event.js'
import { FixtureDto, FixtureSummaryDto } from '../../../shared-types/fixtures-dto.js'
import LineupPlayer from './LineupPlayer.js'
import LineupCoach from './LineupCoach.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export const scheduledFixtureStatuses = ['TBD', 'NS']
export const inplayFixtureStatues = ['1H', 'HT', '2H', 'ET', 'BT', 'P', 'SUSP', 'INT', 'LIVE']
export const finishedFixtureStatuses = ['FT', 'AET', 'PEN']
export const postponedFixtureStatuses = ['PST']
export const abandonedFixtureStatuses = ['ABD']
export const cancelledFixtureStatuses = ['CANC']
export const notPlayedFixtureStatuses = ['AWD', 'WO']

export default class Fixture extends BaseModel {
  public static async getFixturesInPlay() {
    return await Fixture.query()
      .where('kickoff', '<', DateTime.now().toSQL())
      .andWhereIn('status', [...scheduledFixtureStatuses, ...inplayFixtureStatues])
  }

  public async updateFixtureFromFootballApi(fixture: any) {
    const homeTeam = await Team.findBy('footballApiId', fixture.teams.home.id)
    const awayTeam = await Team.findBy('footballApiId', fixture.teams.away.id)

    if (!homeTeam) {
      throw new Error(`Team not found with footballApiId: ${fixture.teams.home.id}`)
    }

    if (!awayTeam) {
      throw new Error(`Team not found with footballApiId: ${fixture.teams.away.id}`)
    }

    if (fixture.fixture.status.short === 'PST') {
      console.log(`Skipping fixture ${fixture.fixture.id} because it is postponed`)
      return
    }

    this.footballApiId = fixture.fixture.id
    this.homeTeamId = homeTeam.id
    this.awayTeamId = awayTeam.id
    this.homeTeamScore = fixture.score.fulltime.home
    this.awayTeamScore = fixture.score.fulltime.away
    this.kickoff = DateTime.fromISO(fixture.fixture.date)
    this.status = fixture.fixture.status.short
  }

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
      home_team_score: this.homeTeamScore,
      away_team_score: this.awayTeamScore,
      away_team: {
        id: this.awayTeam.id,
        name: this.awayTeam.name,
        football_api_id: this.awayTeam.footballApiId,
      },
      home_team: {
        id: this.homeTeam.id,
        name: this.homeTeam.name,
        football_api_id: this.homeTeam.footballApiId,
      },
      kickoff: this.kickoff.toISO(),
    }
  }

  getPlayersFromTeam(teamId: number): LineupPlayer[] {
    return this.lineupPlayers.filter((player) => player.teamId === teamId)
  }

  getCoachesFromTeam(teamId: number): LineupCoach[] {
    return this.lineupCoaches.filter((coach) => coach.teamId === teamId)
  }

  public toDto(): FixtureDto {
    return {
      ...this.toSummaryDto(),
      events: this.events.map((event) => event.toDto()),
      lineupPlayersHome: this.getPlayersFromTeam(this.homeTeam.id).map((lineupPlayer) =>
        lineupPlayer.toDto()
      ),
      lineupPlayersAway: this.getPlayersFromTeam(this.awayTeam.id).map((lineupPlayer) =>
        lineupPlayer.toDto()
      ),
      lineupCoachesHome: this.getCoachesFromTeam(this.homeTeam.id).map((lineupCoach) =>
        lineupCoach.toDto()
      ),

      lineupCoachesAway: this.getCoachesFromTeam(this.awayTeam.id).map((lineupCoach) =>
        lineupCoach.toDto()
      ),
    }
  }
}
