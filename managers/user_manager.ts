const knex = require('knex')(require('../knexfile').development);
const bcrypt1 = require('bcrypt');

// Hash password before saving user
const createUser = async (email: string, password: string) => {
  const salt = await bcrypt1.genSaltSync(10);
  console.log(password)

  const hashedPassword = await bcrypt1.hash( password, salt);
  // const hashedPassword = await bcrypt.hash(saltedPassword, 10);
  
  const [user] = await knex('users')
    .insert({
      email,
      password: hashedPassword,
    })
    .returning('*');
  return user;
};

// Validate user credentials
const validateUser = async (email: string, password: string) => {
  const user = await knex('users')
    .where({ email })
    .first();

  if (!user) {
    throw new Error('User not found');
  }

  const isMatch = await bcrypt1.compare(password, user.password);

  if (!isMatch) {
    throw new Error('Invalid password');
  }

  return user;
};

const GetUser = async(email: string) =>{
  const user = await knex('users')
    .where({ email: email.toLowerCase() })
    .first();

    return user;
};

module.exports = {
  createUser,
  validateUser,
  GetUser,
};
