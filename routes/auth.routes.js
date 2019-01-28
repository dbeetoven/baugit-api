const express = require('express');
const router = express.Router();
const auhtCtrl = require('../controllers/auth.controller')
const verifySignUp = require('../middlewares/verifySignUp');
const authJwt = require('../middlewares/verifyJwtToken');

router.post('/login', auhtCtrl.login);
router.post('/signup', [verifySignUp.checkDuplicateUserNameOrEmail], auhtCtrl.signup);
router.get('/me/:id', [authJwt.verifyToken], auhtCtrl.getUserData);
router.get('/forgot',auhtCtrl.forgot);
router.get('/reset/:token', auhtCtrl.reset);
router.get('/logout', function (req, res) {
    res.status(200).send({
        auth: false,
        token: null
    });
});

module.exports = router;