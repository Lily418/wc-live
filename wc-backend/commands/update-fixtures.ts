import fs from 'fs'
import { BaseCommand } from "@adonisjs/core/ace";
import { CommandOptions } from "@adonisjs/core/types/ace";

export default class UpdateFixtures extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'update:fixtures'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''
    static options: CommandOptions = {
          loadApp: true,
          staysAlive: false,
        };

  public async run() {
    this.logger.info(`Updating fixtures`)
    const response = await fetch(
      new Request(`https://v3.football.api-sports.io/fixtures?season=2023&league=699`, {
        headers: {
          'x-rapidapi-host': 'v3.football.api-sports.io',
          'x-rapidapi-key': process.env.FOOTBALL_API_KEY as string,
        },
      })
    )
    if (!response.ok) this.logger.error(`Failed to fetch fixtures`)

    const json: any = await response.json()
    fs.writeFileSync(`./database/seed_data/fixtures.json`, JSON.stringify(json, null, 2))
  }
}
