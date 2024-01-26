import Team from '#models/Team'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import teams from '../seed_data/teams.json' assert { type: 'json' }

export default class extends BaseSeeder {
  public async run() {
    await Team.truncate()
    await Promise.all(
      teams.map((team: any) =>
        Team.create({
          footballApiId: team.team.id,
          name: team.team.name,
        })
      )
    )
  }
}
