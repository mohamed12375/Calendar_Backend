/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
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
exports.down = function(knex) {
    return knex.schema.dropTable('calendars');
};
