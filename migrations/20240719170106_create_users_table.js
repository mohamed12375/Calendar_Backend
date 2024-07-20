/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary(); // Auto-incrementing ID column
        table.string('email').notNullable().unique(); // Email column, must be unique and not null
        table.string('password').notNullable(); // Password column, must not be null
        table.timestamps(true, true); // Created at and updated at timestamps
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
