const router = require('express').Router();
const controller = require('../db/controller/controller.js');

router.get('/:id/calendar', controller.get);
router.post('/:id/reservation', controller.post);

module.exports = router;
