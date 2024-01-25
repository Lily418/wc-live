/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import router from '@adonisjs/core/services/router'
import Fixture from '#app/Models/Fixture'
import { FixtureDto, FixturesDto } from '../../shared-types/fixtures-dto.js'

router.get('/fixtures', async (): Promise<FixturesDto> => {
  return {
    fixtures: (await Fixture.query().preload('homeTeam').preload('awayTeam')).map((fixture) =>
      fixture.toSummaryDto()
    ),
  }
})

router.get('/fixtures/:id', async ({ params }): Promise<FixtureDto> => {
  const fixture = await Fixture.query()
    .preload('homeTeam')
    .preload('awayTeam')
    .preload('events', async (eventsQuery) => {
      eventsQuery.preload('team')
      eventsQuery.preload('player')
      eventsQuery.preload('assist')
    })
    .preload('lineupPlayers')
    .preload('lineupCoaches')
    .where('id', params.id)
  return fixture[0].toDto()
})
