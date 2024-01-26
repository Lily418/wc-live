import fs from 'fs'
import { BaseCommand } from '@adonisjs/core/ace'
import { flags } from '@adonisjs/core/ace'
import { CommandOptions } from '@adonisjs/core/types/ace'

export default class UpdatePlayers extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'update:players'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''
  static options: CommandOptions = {
    loadApp: false,
    staysAlive: false,
  }
  @flags.number({ alias: 's', description: 'Page on the API to start at' })
  public startPage!: number

  private async fetchPage(page: number): Promise<{
    totalPages: number
  }> {
    const response = await fetch(
      new Request(`https://v3.football.api-sports.io/players?league=699&season=2023&page=${page}`, {
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': process.env.FOOTBALL_API_KEY as string,
        },
      })
    )

    if (!response.ok) this.logger.error(`Failed to fetch page ${page}`)

    const json: any = await response.json()
    fs.writeFileSync(
      `./database/seed_data/players/players-${page}.json`,
      JSON.stringify(json, null, 2)
    )

    return { totalPages: json.paging.total }
  }

  public async run() {
    if (!process.env.FOOTBALL_API_KEY) {
      this.logger.error('FOOTBALL_API_KEY not set')
      return
    }

    let startPage: number = this.startPage ?? 1
    const { totalPages } = await this.fetchPage(startPage)
    this.logger.info(`Total pages: ${totalPages}`)
    for (let i = startPage + 1; i <= totalPages; i++) {
      this.logger.info(`Fetching page ${i}`)
      await this.fetchPage(i)
    }
  }
}
