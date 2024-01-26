import fs from 'fs'
import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import Fixture from '#models/Fixture'

export default class UpdateEvents extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'update:events'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''
  static options: CommandOptions = {
    startApp: true,
    staysAlive: false,
  }

  private async fetchEvents(fixtureId: number) {
    this.logger.info(`Fetching events for fixture ${fixtureId}`)
    const response = await fetch(
      new Request(`https://v3.football.api-sports.io/fixtures/events?fixture=${fixtureId}`, {
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': process.env.FOOTBALL_API_KEY as string,
        },
      })
    )

    if (!response.ok) this.logger.error(`Failed to fetch fixture ${fixtureId}`)

    const json: any = await response.json()
    fs.writeFileSync(
      `./database/seed_data/events/events-${fixtureId}.json`,
      JSON.stringify(json, null, 2)
    )
  }

  public async run() {
    const fixtures = await Fixture.query().where('status', '=', 'FT').andDoesntHave('events')
    console.log('fixtures', fixtures)
    for (const fixture of fixtures) {
      await this.fetchEvents(fixture.footballApiId)
      // API rate limit is 10 requests per minute
      // so we conservatively wait 10 seconds between requests
      await new Promise((resolve) => setTimeout(resolve, 1000 * 10))
    }
  }
}
