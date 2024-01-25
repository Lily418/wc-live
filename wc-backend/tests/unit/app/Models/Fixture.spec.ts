import { test } from '@japa/runner'
import Fixture from '#app/Models/Fixture'
import { DateTime } from 'luxon'

test.group('Fixture', (group) => {
  group.each.teardown(async () => {
    await Fixture.query().delete()
  })

  test('returns no fixtures when none exist', async ({ assert }) => {
    // GIVEN
    // no fixtures exist
    // WHEN
    const result = await Fixture.getFixturesInPlay()

    // THEN
    assert.deepEqual(result, [])
  })

  test('does not return a fixture that has finished', async ({ assert }) => {
    // GIVEN
    await Fixture.create({
      footballApiId: 1,
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamScore: 1,
      awayTeamScore: 0,
      kickoff: DateTime.now().minus({ minutes: 1 }),
      status: 'FT',
    })

    // WHEN
    const result = await Fixture.getFixturesInPlay()

    // THEN
    assert.deepEqual(result, [])
  })

  test('returns a fixture which has not started but kickoff time has passed', async ({
    assert,
  }) => {
    // GIVEN
    const kickoffTime = DateTime.now().minus({ minutes: 1 }).startOf('second')
    await Fixture.create({
      footballApiId: 1,
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamScore: null,
      awayTeamScore: null,
      kickoff: kickoffTime,
      status: 'NS',
    })

    // WHEN
    const result = await Fixture.getFixturesInPlay()

    // THEN
    assert.equal(result.length, 1)

    console.log('result', result[0].$attributes)
    assert.deepInclude(result[0].$attributes, {
      footballApiId: 1,
      homeTeamId: 1,
      awayTeamId: 2,
      homeTeamScore: null,
      awayTeamScore: null,
      kickoff: kickoffTime,
      status: 'NS',
    })

    test('does not return a fixture not scheduled to start yet', async ({ assert }) => {
      const kickoffTime = DateTime.now().plus({ hour: 1 }).toISO()
      await Fixture.create({
        footballApiId: 1,
        homeTeamId: 1,
        awayTeamId: 5,
        homeTeamScore: null,
        awayTeamScore: null,
        kickoff: DateTime.fromISO(kickoffTime),
        status: 'NS',
      })

      // WHEN
      const result = await Fixture.getFixturesInPlay()

      console.log('result', result)

      // THEN
      assert.equal(result.length, 0)
    })
  })
})
