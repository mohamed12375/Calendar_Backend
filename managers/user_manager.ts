import { InvalidCredentialException } from "../Exceptions/InvalidCredentialException";

import { db } from '../startup/db';

const bcrypt1 = require('bcrypt');

// Function to create a user and associated calendar
const createUser = async (email: string, password: string) => {
  // Start a transaction
  const trx = await db.transaction();

  try {
    // Hash the password
    const salt = await bcrypt1.genSaltSync(10);
    const hashedPassword = await bcrypt1.hash(password, salt);

    // Insert the user into the users table
    const [user] = await trx('users')
      .insert({
        email,
        password: hashedPassword,
      })
      .returning('*');

    // Insert a calendar associated with the user
    const [calendar] = await trx('calendars')
      .insert({
        userId: user.id,
        sharedWith: JSON.stringify([]), // Initializing an empty sharedWith array
      })
      .returning('*');

    // Commit the transaction
    await trx.commit();

    // Return the user and the associated calendar
    return { user, calendar };
  } catch (error) {
    // If any error occurs, rollback the transaction
    await trx.rollback();
    throw error;
  }
};

// Validate user credentials
const validateUser = async (email: string, password: string) => {
  const user = await db('users')
    .where({ email })
    .first();

  if (!user) {
    throw new InvalidCredentialException();
  }

  const isMatch = await bcrypt1.compare(password, user.password);

  if (!isMatch) {
    throw new InvalidCredentialException();
  }

  return user;
};

const GetUser = async(email: string) =>{
  const user = await db('users')
    .where({ email: email.toLowerCase() })
    .first();

    return user;
};

module.exports = {
  createUser,
  validateUser,
  GetUser,
};
