var express = require('express');
var router = express.Router();
var { responseController } = require('../Controllers/response')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// post records
router.post('/', responseController.recordResponse)

module.exports = router;
