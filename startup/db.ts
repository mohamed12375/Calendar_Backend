
const { Pool, Client } = require('pg');
require('dotenv').config();
const knex = require('knex');
const knexConfig = require('../knexfile').development;

const connectionParams = {
  user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};

const pool = new Pool(
  {
  ...connectionParams,
  database: process.env.DB_DATABASE
});

// Function to check and create the database if it doesn't exist
async function setupDatabase() {
  // Connect to the PostgreSQL server (not a specific database)
  const client = new Client(connectionParams);

  try {
    await client.connect();

    // Check if the database exists
    const res = await client.query(`SELECT 1 FROM pg_database WHERE datname = $1`, [process.env.DB_DATABASE]);
    if (res.rowCount === 0) {
      // Database does not exist, create it
      await client.query(`CREATE DATABASE ${process.env.DB_DATABASE}`);
      console.log(`Database '${process.env.DB_DATABASE}' created successfully.`);
    } else {
      console.log(`Database '${process.env.DB_DATABASE}' already exists.`);
    }
    await client.end();
     // Initialize Knex with the new database connection
     const db = knex(knexConfig);

     // Run migrations
     await db.migrate.latest();
  } catch (err) {
    console.error('Error checking or creating database:', err);
  } 
}

// Call the function to set up the database
setupDatabase();

module.exports = pool