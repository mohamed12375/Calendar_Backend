const exp = require('express');
const customers = require('../routes/customers');
const auth = require('../routes/auth');
const jwtAuth1 = require("../middleware/authorized")

// const auth = require('../routes/auth');
const error = require('../middleware/error');

module.exports = function(app: { use: (arg0: string,arg1?: undefined, arg2?: undefined) => void; }) {
  
  app.use(exp.json());
  app.use('/api/auth', auth);
  app.use('/api/customers',jwtAuth1,  customers);
  app.use(error);
}