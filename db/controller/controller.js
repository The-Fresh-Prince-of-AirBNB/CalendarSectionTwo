const model = require('../model/model.js');

module.exports = {
  get: (req, res) => {
    model.getOne(req.params, (err, results) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.status(200);
        res.send(results);
      }
    });
  },

  post: (req, res) => {
    const find = req.body;
    model.makeReservation(find, (err, result) => {
      if (err) {
        res.sendStatus(400);
      } else {
        res.status(201);
        res.send(result);
      }
    });
  },
};
