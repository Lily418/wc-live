import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Player from 'App/Models/Player'
import fs from 'fs'

export default class extends BaseSeeder {
  public async run() {
    await Player.truncate()
    await Promise.all(
      fs.readdirSync('./database/seed_data/players').map(async (file) => {
        const playersFile = JSON.parse(
          fs.readFileSync(`./database/seed_data/players/${file}`, 'utf8')
        )
        await Promise.all(
          playersFile.response.map((player: any) =>
            Player.create({
              footballApiId: player.player.id,
              name: player.player.name,
            })
          )
        )
      })
    )
  }
}
