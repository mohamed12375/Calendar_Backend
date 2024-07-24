import { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex: Knex) {
    return knex.schema.createTable('events', (table) => {
        table.increments('id').primary(); // Auto-incrementing ID column
        table.string('name').notNullable(); // Event name
        table.string('details'); // Event details
        table.timestamp('date').notNullable(); // Event date and time
        table.integer('calendarId').unsigned().notNullable();
        table.foreign('calendarId').references('id').inTable('calendars').onDelete('CASCADE');
        table.integer('userId').unsigned();
        table.foreign('userId').references('id').inTable('users').onDelete('SET NULL');
        table.json('sharedWith'); // JSON column for storing shared users
        table.timestamps(true, true); // Created at and updated at timestamps
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex: Knex) {
    return knex.schema.dropTable('events');
};
