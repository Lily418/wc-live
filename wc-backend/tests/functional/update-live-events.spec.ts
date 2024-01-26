import ace from '@adonisjs/core/services/ace'
import { test } from '@japa/runner'
import Fixture from '#models/Fixture'
import Event from '#models/Event'
import Team from '#models/Team'
import UpdateLiveEvents from '../../commands/update-live-events.js'
import nock from 'nock'
import { DateTime } from 'luxon'
import response from './fake-response/fixture1.json' assert { type: 'json' }
import axios from 'axios'
import Player from '#models/Player'

axios.defaults.adapter = 'http'

test.group('update-live-events', (group) => {
  group.each.setup(async () => {
    await Fixture.query().delete()
    await Event.query().delete()
    await Player.query().delete()
    await Team.query().delete()

    await Team.create({
      id: 1,
      footballApiId: 1,
      name: 'Team 1',
    })

    await Team.create({
      id: 2,
      footballApiId: 1845,
      name: 'Team 2',
    })

    await Player.create({
      id: 1,
      footballApiId: 1,
      name: 'Player 1',
    })
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
    await command.exec()

    // THEN
    nockScope.done()
    const updatedFixture = await Fixture.find(2)
    assert.equal(updatedFixture?.status, 'FT')
  })

  test('updates the events of a fixture', async ({ assert }) => {
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

    await Event.create({
      time_elapsed: 5,
      time_elapsed_extra: null,
      detail: 'Goal',
      type: 'goal',
      teamId: 1,
      playerId: 1,
      fixtureId: 1,
    })

    const params = new URLSearchParams({ ids: '5-6' })

    const nockScope = nock('https://v3.football.api-sports.io')
      .get('/fixtures')
      .query(params)
      .reply(200, response)

    const command = await ace.create(UpdateLiveEvents, [])

    // WHEN
    await command.exec()

    // THEN
    nockScope.done()
    const events = await Event.query().where('fixtureId', 1)
    assert.equal(events.length, 8)
    assert.equal(events?.filter((event) => event.type === 'goal').length, 1)
  })
})
