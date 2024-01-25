import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = 'lineup_players'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('player_id').unsigned().references('players.id').onDelete('CASCADE')

      table.integer('team_id').unsigned().references('teams.id').onDelete('CASCADE').notNullable()

      table
        .integer('fixture_id')
        .unsigned()
        .references('fixtures.id')
        .onDelete('CASCADE')
        .notNullable()

      table.string('player_name').notNullable()
      table.integer('player_number').notNullable()

      table.boolean('substitute').notNullable()

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
