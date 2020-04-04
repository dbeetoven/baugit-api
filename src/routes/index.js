var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Baugit App', { title: 'Brontrix Api' });
});
module.exports = router;
