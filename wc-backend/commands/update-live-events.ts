import Fixture, { scheduledFixtureStatuses, inplayFixtureStatues } from '#app/Models/Fixture'
import { DateTime } from 'luxon'
import { BaseCommand } from "@adonisjs/core/ace";
import { CommandOptions } from "@adonisjs/core/types/ace";

export default class UpdateLiveEvents extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'update:live_events'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''
    static options: CommandOptions = {
          loadApp: true,
          staysAlive: true,
        };

  public async run() {
    const inProgress = await Fixture.getFixturesInPlay()

    console.log('inProgress', inProgress)
  }
}
