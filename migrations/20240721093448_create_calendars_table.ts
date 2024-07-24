import { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex: Knex) {
    return knex.schema.createTable('calendars', (table) => {
        table.increments('id').primary(); // Auto-incrementing ID column
        table.json('sharedWith'); // JSON column for storing shared users
        table.timestamps(true, true); // Created at and updated at timestamps
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex: Knex) {
    return knex.schema.dropTable('calendars');
};
