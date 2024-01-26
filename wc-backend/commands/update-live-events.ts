import Fixture from '#models/Fixture'
import { BaseCommand } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'
import axios from 'axios'
import db from '@adonisjs/lucid/services/db'

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
    startApp: true,
    staysAlive: false,
  }

  public async run() {
    const inProgress = await Fixture.getFixturesInPlay()

    this.logger.info(`Updating ${JSON.stringify(inProgress)} fixtures`)

    const ids = inProgress.reduce((acc, fixture) => {
      return acc.length === 0 ? `${fixture.footballApiId}` : `${acc}-${fixture.footballApiId}`
    }, '')

    const response = await axios.get(`https://v3.football.api-sports.io/fixtures?ids=${ids}`, {
      headers: {
        'x-rapidapi-host': 'v3.football.api-sports.io',
        'x-rapidapi-key': process.env.FOOTBALL_API_KEY as string,
      },
    })

    await Promise.all(
      response.data.response.map(async (fixture: any) => {
        const fixtureInDb = await Fixture.findByOrFail('footballApiId', fixture.fixture.id)

        const trx = await db.transaction()
        await trx.query().from('events').where('fixture_id', fixtureInDb.id).delete()
        await Promise.all(
          fixture.events.map(async (event: any) => {
            const team = await trx
              .query()
              .from('teams')
              .where('football_api_id', event.team.id)
              .first()

            const player = await trx
              .query()
              .from('players')
              .where('football_api_id', event.player.id)
              .first()

            const assist = await trx
              .query()
              .from('players')
              .where('football_api_id', event.assist?.id)
              .first()

            if (!team) {
              console.error(`Team with footballApiId ${event.team.id} not found`)
            }

            if (!player && event.player.id !== null) {
              console.error(`Player with footballApiId ${event.player.id} not found`)
            }

            if (event.assist?.id && !assist) {
              console.error(`Player with footballApiId ${event.assist.id} not found`)
            }

            await trx.insertQuery().table('events').insert({
              time_elapsed: event.time.elapsed,
              time_elapsed_extra: event.time.extra,
              type: event.type.toLowerCase(),
              detail: event.detail,
              fixture_id: fixtureInDb.id,
              team_id: team!.id,
              player_id: player!.id,
              assist_id: assist!.id,
            })
          })
        )
        await trx.commit()

        await fixtureInDb.updateFixtureFromFootballApi(fixture)
        await fixtureInDb.save()
      })
    )
  }
}
