var express = require('express')
  , router = express.Router()

router.get('/test1', function(req,res) {
	res.send('this is test 1')
})

module.exports = router