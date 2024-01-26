import { BaseSeeder } from '@adonisjs/lucid/seeders'
import fixtures from '../seed_data/fixtures.json' assert { type: 'json' }
import Fixture from '#models/Fixture'

export default class extends BaseSeeder {
  public async run() {
    await Fixture.truncate()
    await Promise.all(
      fixtures.map(async (fixture: any) => {
        const fixtureModel = new Fixture()
        await fixtureModel.updateFixtureFromFootballApi(fixture)
        if (fixtureModel.footballApiId) {
          await fixtureModel.save()
        }
      })
    )
  }
}
