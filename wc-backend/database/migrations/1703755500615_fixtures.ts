import { BaseSchema } from "@adonisjs/lucid/schema";

export default class extends BaseSchema {
  protected tableName = 'fixtures'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('football_api_id').notNullable()
      table.index(['football_api_id'], `${this.tableName}_football_api_id_index`)

      table.integer('home_team_id').unsigned().references('teams.id').onDelete('CASCADE')
      table.integer('away_team_id').unsigned().references('teams.id').onDelete('CASCADE')

      table.integer('home_team_score').nullable()
      table.integer('away_team_score').nullable()

      table.dateTime('kickoff').notNullable()

      table
        .enum('status', [
          'FT',
          'NS',
          '1H',
          'HT',
          '2H',
          'ET',
          'BT',
          'P',
          'SUSP',
          'INT',
          'FT',
          'AET',
          'PEN',
          'PST',
          'CANC',
          'ABD',
          'AWD',
          'WO',
          'LIVE',
        ])
        .notNullable()

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
