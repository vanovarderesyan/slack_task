import * as Knex from 'knex';

import Table from '../../resources/enums/Table';

export function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(Table.CHANNELS, table => {
    table.increments('id').primary();
    table.string('name',255).notNullable()
    table
      .integer('creator_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(Table.USERS)
      .onDelete('CASCADE');;

    table
      .integer('workspace_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable(Table.WORKSPACE)
      .onDelete('CASCADE');
      

    table.timestamps(true, true);
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable(Table.USER_SESSIONS);
}
