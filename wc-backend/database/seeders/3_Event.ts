import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Fixture from 'App/Models/Fixture'
import Event from 'App/Models/Event'
import fs from 'fs'
import Player from 'App/Models/Player'
import Team from 'App/Models/Team'

export default class extends BaseSeeder {
  public async run() {
    const eventsFiles = fs
      .readdirSync('./database/seed_data/events/')
      .map((file) => JSON.parse(fs.readFileSync(`./database/seed_data/events/${file}`, 'utf8')))

    await Promise.all(
      eventsFiles.map(async (events) => {
        const fixtureFootballApiId = events.parameters.fixture
        const fixture = await Fixture.findByOrFail('footballApiId', fixtureFootballApiId)
        await Promise.all(
          events.response.map(async (event) => {
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

            return Event.create({
              time_elapsed: event.time.elapsed,
              time_elapsed_extra: event.time.extra,
              type: event.type.toLowerCase(),
              teamId: team!.id,
              playerId: player?.id,
              assistId: assist?.id,
              fixtureId: fixture.id,
            })
          })
        )
      })
    )
  }
}
