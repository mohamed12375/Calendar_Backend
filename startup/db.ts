import { attachPaginate } from "knex-paginate";

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


const db = knex(knexConfig);
attachPaginate();

async function setupDatabase() {
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

    // Run migrations
    await db.migrate.latest();
    console.log('Migrations run successfully.');
  } catch (err) {
    console.error('Error setting up the database:', err);
    throw err;
  }
}
 //setupDatabase()

// Export the setup function and the db instance
export { setupDatabase, db , pool};