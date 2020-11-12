var router = require('express').Router();

router.get('/', () => {
  console.log('get request!')
})

module.exports = router;