var express = require('express');
var parser = require('body-parser');
var router = require('./routes.js');

// import the db later !!

var app = express();

app.set('port', 8000);

app.use(parser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.use('/homes', router);

app.listen(app.get('port'), err => {
  if (err) {
    console.log('error connecting to server')
  } else {
    console.log(`>>> Listening on port ${app.get('port')} <<<`);
  }
})