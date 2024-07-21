/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.table('calendars', (table) => {
        table.integer('userId').unsigned().notNullable();
        table.foreign('userId').references('id').inTable('users').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.table('calendars', (table) => {
        table.dropColumn('userId');
    });
};
