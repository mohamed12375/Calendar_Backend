import { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex: Knex) {
    return knex.schema.table('users', (table) => {
        table.dropColumn('calendarId');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex: Knex) {
    return knex.schema.table('users', (table) => {
        table.integer('calendarId').unsigned().unique();
        table.foreign('calendarId').references('id').inTable('calendars').onDelete('SET NULL');
    });
};
