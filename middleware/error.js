const winston = require('winston');
const { ExceptionError } = require('../Exceptions/mainError/ExceptionError');

module.exports = function(err, req, res, next){
  winston.error(err.message, err);

  // error
  // warn
  // info
  // verbose
  // debug 
  // silly
  if (err instanceof ExceptionError) {
    res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  } else {
    res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    });
  }

  // res.status(500).send('Something failed in the server.');
}