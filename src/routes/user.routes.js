
var express = require('express');
var router = express.Router();
// const auth = require(../middleware/auth'')

router.get('/', function(req, res, next) {
  res.render('user', { user: req.user });
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login')
}

module.exports = router;
