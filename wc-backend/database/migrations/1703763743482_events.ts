import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = 'events'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('time_elapsed')
      table.integer('time_elapsed_extra')

      table.enum('type', ['goal', 'card', 'subst'])

      table.integer('team_id').unsigned().references('teams.id').onDelete('CASCADE')

      table.integer('player_id').unsigned().references('players.id').onDelete('CASCADE')

      table.integer('assist_id').unsigned().references('players.id').onDelete('CASCADE')

      table.integer('fixture_id').unsigned().references('fixtures.id').onDelete('CASCADE')

      table.string('player_name')
      table.string('assist_name').nullable()

      table.string('detail').nullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
