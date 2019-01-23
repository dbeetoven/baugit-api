
var express = require('express');
var router = express.Router();
var authMDW = require('../middlewares/auth.middleware');

/* GET users listing. */
router.get('/',[authMDW.verifyJWT_MW],(req, res, next) => {
  res.send('respond with a resource');
});

router.post('/',[authMDW.verifyJWT_MW], (req, res) => {
    res.send('respond with a resource');
});
module.exports = router;