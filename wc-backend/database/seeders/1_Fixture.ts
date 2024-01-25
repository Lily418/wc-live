import { BaseSeeder } from '@adonisjs/lucid/seeders'
import fixtures from '../seed_data/fixtures.json' assert { type: 'json' }
import Fixture from '#app/Models/Fixture'
import { DateTime } from 'luxon'
import Team from '#app/Models/Team'

export default class extends BaseSeeder {
  public async run() {
    await Fixture.truncate()
    await Promise.all(
      fixtures.map(async (fixture) => {
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

        return Fixture.create({
          footballApiId: fixture.fixture.id,
          homeTeamId: homeTeam.id,
          awayTeamId: awayTeam.id,
          homeTeamScore: fixture.score.fulltime.home,
          awayTeamScore: fixture.score.fulltime.away,
          kickoff: DateTime.fromISO(fixture.fixture.date),
          status: fixture.fixture.status.short,
        })
      })
    )
  }
}
