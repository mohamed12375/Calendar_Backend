// db/queries.js

const knex_events = require('./index');

// Function to create an event
const createEvent = async (event: any) => {
  return await knex_events('events').insert(event).returning('*');
};

// Function to get all events paginated by date
const getAllEventsPaginated = async (page: Int32Array, pageSize: Int32Array) => {
  return await knex_events('events')
    .orderBy('date', 'desc')
    .paginate({
      perPage: pageSize,
      currentPage: page,
      isLengthAware: true,
    });
};

module.exports = {
  createEvent,
  getAllEventsPaginated,
};