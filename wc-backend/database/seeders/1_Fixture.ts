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
        const fixtureModel = new Fixture()
        await fixtureModel.updateFixtureFromFootballApi(fixture)
        if (fixtureModel.footballApiId) {
          await fixtureModel.save()
        }
      })
    )
  }
}
