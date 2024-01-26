import Player from '#models/Player'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import fs from 'fs'
import he from 'he'

export default class extends BaseSeeder {
  public async run() {
    await Promise.all(
      fs.readdirSync('./database/seed_data/players').map(async (file) => {
        const playersFile = JSON.parse(
          fs.readFileSync(`./database/seed_data/players/${file}`, 'utf8')
        )
        await Promise.all(
          playersFile.response.map((player: any) =>
            Player.create({
              footballApiId: player.player.id,
              name: he.decode(player.player.name),
            })
          )
        )
      })
    )
  }
}
