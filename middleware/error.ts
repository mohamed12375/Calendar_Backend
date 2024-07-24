const winston = require('winston');
const { ExceptionError } = require('../Exceptions/mainError/ExceptionError');

module.exports = function(err: { message: any; statusCode: any; }, req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { status: string; message: any; }): void; new(): any; }; }; }, next: any){
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