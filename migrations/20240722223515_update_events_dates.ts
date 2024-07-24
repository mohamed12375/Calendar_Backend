import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('events', (table) => {
    table.renameColumn('date', 'fromDate');
    table.timestamp('toDate').notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('events', (table) => {
    table.renameColumn('fromDate', 'date');
    table.dropColumn('toDate');
  });
}
