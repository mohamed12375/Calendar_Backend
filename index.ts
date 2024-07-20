const winston = require('winston');
const express = require('express');
// require('typescript-require');
const cors = require('cors');
const app = express();

app.use(cors());


require('./startup/logging');
require('./startup/routes')(app);
const db = require('./startup/db');
// require('./startup/config')();
require('./startup/validation')();

app.get('/d', (req: any, res: { send: (arg0: string) => void; }) => {
  res.send('Hello World!');
});

app.get('/', async (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: any): void; new(): any; }; send: { (arg0: string): void; new(): any; }; }; }) => {
    try {
      const result = await db.query('SELECT * FROM users');
      res.status(200).json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));