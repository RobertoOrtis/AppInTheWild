var express = require('express')
  , router = express.Router()

router.get('/test2', function(req,res) {
	res.send('this is test 2')
})

module.exports = router