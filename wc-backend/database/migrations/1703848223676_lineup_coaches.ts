import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = 'lineup_coaches'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('team_id').unsigned().references('teams.id').onDelete('CASCADE').notNullable()

      table
        .integer('fixture_id')
        .unsigned()
        .references('fixtures.id')
        .onDelete('CASCADE')
        .notNullable()

      table.string('name').notNullable()

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
