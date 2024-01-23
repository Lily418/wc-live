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

import Route from '@ioc:Adonis/Core/Route'
import Fixture from 'App/Models/Fixture'
import { FixturesDto } from '../../shared-types/fixtures-dto'

Route.get('/fixtures', async (): Promise<FixturesDto> => {
  return {
    fixtures: (await Fixture.query().preload('homeTeam').preload('awayTeam')).map((fixture) =>
      fixture.toDto()
    ),
  }
})

Route.get('/fixtures/:id', async ({ params }) => {})