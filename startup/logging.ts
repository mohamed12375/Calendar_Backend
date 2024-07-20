const winst = require('winston');
require('express-async-errors');

module.exports = function() {
  winst.handleExceptions(
    new winst.transports.File({ filename: 'uncaughtExceptions.log' }));
  
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });
  
  winst.add(winst.transports.File, { filename: 'logfile.log' }); 
}