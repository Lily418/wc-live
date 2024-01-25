import ace from '@adonisjs/core/services/ace'
import { test } from '@japa/runner'
import Fixture from '#app/Models/Fixture'
import UpdateLiveEvents from '../../commands/update-live-events.js'
import nock from 'nock'
import { DateTime } from 'luxon'
import response from './fake-response/fixture1.json' assert { type: 'json' }
import axios from 'axios'

axios.defaults.adapter = 'http'

test.group('update-live-events', (group) => {
  group.each.setup(async () => {
    await Fixture.query().delete()
  })

  test('updates the status of a fixture to full time', async ({ assert }) => {
    // GIVEN

    await Fixture.create({
      id: 1,
      status: 'NS',
      kickoff: DateTime.now().minus({ minutes: 1 }),
      footballApiId: 5,
    })

    await Fixture.create({
      id: 2,
      status: 'NS',
      kickoff: DateTime.now().minus({ minutes: 1 }),
      footballApiId: 6,
    })

    const params = new URLSearchParams({ ids: '5-6' })
    const nockScope = nock('https://v3.football.api-sports.io')
      .get('/fixtures')
      .query(params)
      .reply(200, response)

    const command = await ace.create(UpdateLiveEvents, [])

    // WHEN
    const result = await command.exec()

    // THEN
    nockScope.done()
    const updatedFixture = await Fixture.find(2)
    assert.equal(updatedFixture?.status, 'FT')
  })
})
