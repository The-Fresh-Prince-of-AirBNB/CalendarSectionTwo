const express = require('express');
const parser = require('body-parser');
const path = require('path');
const router = require('./routes.js');

// eslint-disable-next-line no-unused-vars
const db = require('../db/mongo/db.js');

const app = express();

app.set('port', 3001);

app.use(parser.json());

app.use('/listings/:reservation_id', express.static(path.join(__dirname, '/../client/dist')), router);

app.listen(app.get('port'), (err) => {
  if (err) {
    console.log('error connecting to server');
  } else {
    console.log(`>>> Listening on port ${app.get('port')} <<<`);
  }
});
