const express = require('express');
const parser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const router = require('./routes.js');

// eslint-disable-next-line no-unused-vars
const db = require('../db/mongo/db.js');

const app = express();
app.use(morgan('dev'));

app.set('port', 3001);

app.use(parser.json());

app.get('/:id/bundle.js', (req, res) => {
  if (req.header('Accept-Encoding').includes('br')) {
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, '/../client/dist/bundle.js.br'));
  } else if (req.header('Accept-Encoding').includes('gz')) {
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'application/javascript');
    res.sendFile(path.join(__dirname, '/../client/dist/bundle.js.gz'));
  } else {
    res.sendFile(path.join(__dirname, '/../client/dist/bundle.js'));
  }
});

app.use('/:reservation_id', express.static(path.join(__dirname, '/../client/dist')), router);

app.listen(app.get('port'), (err) => {
  if (err) {
    console.log('error connecting to server');
  } else {
    console.log(`>>> Listening on port ${app.get('port')} <<<`);
  }
});
