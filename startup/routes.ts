const exp = require('express');
const customers = require('../routes/customers');
const auth = require('../routes/auth');

// const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app: { use: (arg0: string, arg1?: undefined) => void; }) {
  
  app.use(exp.json());
  app.use('/api/auth', auth);
  // app.use('/api/customers', customers);
  app.use(error);
}