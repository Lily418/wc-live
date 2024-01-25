import fs from 'fs'
import Fixture from '#app/Models/Fixture'
import Team from '#app/Models/Team'
import Player from '#app/Models/Player'
import LineupPlayer from '#app/Models/LineupPlayer'
import LineupCoach from '#app/Models/LineupCoach'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  private createLineupPlayer = async ({
    playerFootballApiId,
    teamFootballApiId,
    substitute,
    fixtureId,
    playerNumber,
    playerName,
  }: {
    playerName: string
    playerNumber: number
    playerFootballApiId: number
    teamFootballApiId: number
    substitute: boolean
    fixtureId: number
  }) => {
    const player = await Player.findBy('footballApiId', playerFootballApiId)
    const team = await Team.findBy('footballApiId', teamFootballApiId)

    if (!team) {
      console.error(`Team with footballApiId ${teamFootballApiId} not found`)
    }

    await LineupPlayer.create({
      playerId: player?.id,
      teamId: team!.id,
      fixtureId,
      playerNumber,
      playerName,
      substitute,
    })
  }

  private createLineupCoach = async ({
    coachName,
    teamFootballApiId,
    fixtureId,
  }: {
    coachName: string
    teamFootballApiId: number
    fixtureId: number
  }) => {
    const team = await Team.findBy('footballApiId', teamFootballApiId)

    if (!team) {
      console.error(`Team with footballApiId ${teamFootballApiId} not found`)
    }

    await LineupCoach.create({
      name: coachName,
      teamId: team!.id,
      fixtureId,
    })
  }

  public async run() {
    const lineupFiles = fs
      .readdirSync('./database/seed_data/lineups/')
      .map((file) => JSON.parse(fs.readFileSync(`./database/seed_data/lineups/${file}`, 'utf8')))

    await Promise.all(
      lineupFiles.map(async (lineups) => {
        const fixtureFootballApiId = lineups.parameters.fixture
        const fixture = await Fixture.findBy('footballApiId', fixtureFootballApiId)

        if (!fixture) {
          console.error(`Fixture with footballApiId ${fixtureFootballApiId} not found`)
          return
        }

        await Promise.all(
          lineups.response.map(async (lineup) => {
            await this.createLineupCoach({
              coachName: lineup.coach.name,
              teamFootballApiId: lineup.team.id,
              fixtureId: fixture!.id,
            })

            await Promise.all(
              lineup.startXI.map((startingPlayer) =>
                this.createLineupPlayer({
                  playerFootballApiId: startingPlayer.player.id,
                  teamFootballApiId: lineup.team.id,
                  substitute: false,
                  fixtureId: fixture!.id,
                  playerNumber: startingPlayer.player.number,
                  playerName: startingPlayer.player.name,
                })
              )
            )

            await Promise.all(
              lineup.substitutes.map((substitute) =>
                this.createLineupPlayer({
                  playerFootballApiId: substitute.player.id,
                  teamFootballApiId: lineup.team.id,
                  substitute: true,
                  fixtureId: fixture!.id,
                  playerNumber: substitute.player.number,
                  playerName: substitute.player.name,
                })
              )
            )
          })
        )
      })
    )
  }
}
