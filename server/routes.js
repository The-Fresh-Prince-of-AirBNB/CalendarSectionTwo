const router = require('express').Router();
const controller = require('../db/controller/controller.js');

router.get('/reservations', controller.get);

router.post('/reservations', controller.post);

module.exports = router;
