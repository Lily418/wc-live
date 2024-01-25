import Fixture, { scheduledFixtureStatuses, inplayFixtureStatues } from '#app/Models/Fixture'
import { DateTime } from 'luxon'
import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import axios from 'axios'

export default class UpdateLiveEvents extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'update:live_events'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''
  static options: CommandOptions = {
    loadApp: true,
    staysAlive: true,
  }

  public async run() {
    const inProgress = await Fixture.getFixturesInPlay()
    const ids = inProgress.reduce((acc, fixture) => {
      return acc.length === 0 ? `${fixture.footballApiId}` : `${acc}-${fixture.footballApiId}`
    }, '')

    console.log('ids', ids)

    const response = await axios.get(`https://v3.football.api-sports.io/fixtures?ids=${ids}`, {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': process.env.FOOTBALL_API_KEY as string,
      },
    })

    await Promise.all(
      response.data.response.map(async (fixture: any) => {
        const fixtureInDb = await Fixture.findByOrFail('footballApiId', fixture.fixture.id)
        fixtureInDb.status = fixture.fixture.status.short
        await fixtureInDb.save()
      })
    )
  }
}
