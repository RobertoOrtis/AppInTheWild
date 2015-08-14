var express = require('express')
  , router = express.Router()

router.use(require('./test1'))
router.use(require('./test2'))
router.use(require('./users'))

module.exports = router;