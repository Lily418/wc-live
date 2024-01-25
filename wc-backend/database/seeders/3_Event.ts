import Fixture from '#app/Models/Fixture'
import Event from '#app/Models/Event'
import fs from 'fs'
import Player from '#app/Models/Player'
import Team from '#app/Models/Team'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

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
          events.response.map(async (event: any) => {
            const newEvent = new Event()
            await newEvent.updateFromFootballApi(event, fixture.id)
            await newEvent.save()
          })
        )
      })
    )
  }
}
