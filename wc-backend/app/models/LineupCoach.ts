import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Fixture from './Fixture.js'
import Team from './Team.js'
import { LineupCoachDto } from '../../../shared-types/fixtures-dto.js'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class LineupCoach extends BaseModel {
  @column({ isPrimary: true })
  public id!: number

  @hasOne(() => Fixture, {
    localKey: 'fixtureId',
    foreignKey: 'id',
  })
  public fixture!: HasOne<typeof Fixture>

  @column()
  public fixtureId!: number

  @hasOne(() => Team, {
    localKey: 'teamId',
    foreignKey: 'id',
  })
  public team!: HasOne<typeof Team>

  @column()
  public teamId!: number

  @column()
  public name!: string

  @column.dateTime({ autoCreate: true })
  public createdAt!: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt!: DateTime

  public toDto(): LineupCoachDto {
    return {
      id: this.id,
      fixtureId: this.fixtureId,
      teamId: this.teamId,
      name: this.name,
    }
  }
}
