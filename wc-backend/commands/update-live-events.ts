import { BaseCommand } from '@adonisjs/core/build/standalone'
import Fixture, { scheduledFixtureStatuses, inplayFixtureStatues } from 'App/Models/Fixture'
import { DateTime } from 'luxon'

export default class UpdateLiveEvents extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'update:live_events'

  /**
   * Command description is displayed in the "help" output
   */
  public static description = ''

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: true,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: true,
  }

  public async run() {
    const inProgress = await Fixture.query()
      .where('kickoff', '<', DateTime.now().toSQL())
      .andWhereIn('status', [...scheduledFixtureStatuses, ...inplayFixtureStatues])

    console.log('inProgress', inProgress)
  }
}
