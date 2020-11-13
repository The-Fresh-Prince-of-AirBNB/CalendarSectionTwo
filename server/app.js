const express = require('express');
const parser = require('body-parser');
const path = require('path');
const router = require('./routes.js');

const db = require('../db/mongo/db.js');

const app = express();

app.set('port', 8000);

app.use(parser.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.use('/api/homes', router);

app.listen(app.get('port'), (err) => {
  if (err) {
    console.log('error connecting to server');
  } else {
    console.log(`>>> Listening on port ${app.get('port')} <<<`);
  }
});
