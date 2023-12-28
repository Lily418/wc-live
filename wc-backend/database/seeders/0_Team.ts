import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Team from 'App/Models/Team'
import teams from '../seed_data/teams.json'

export default class extends BaseSeeder {
  public async run() {
    await Team.truncate()
    await Promise.all(
      teams.map((team) =>
        Team.create({
          footballApiId: team.team.id,
          name: team.team.name,
        })
      )
    )
  }
}
