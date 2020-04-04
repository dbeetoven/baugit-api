
var express = require('express');
var router = express.Router();
var authMDW = require('../middlewares/auth.middleware');

// router.get('/',[authMDW.verifyJWT_MW],(req, res, next) => {
//   res.send('respond with a resource');
// });

// router.post('/',[authMDW.verifyJWT_MW], (req, res) => {
//     res.send('respond with a resource');
// });
/* GET users listing. */
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('user', { user: req.user });
});
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/auth/login')
}

module.exports = router;
