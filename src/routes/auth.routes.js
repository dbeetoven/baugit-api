const express = require('express');
const router = express.Router();
const verifyAuth=require('../middlewares/verifyAuth')
const { login, logout, logoutAll, signUp,me } = require('../controllers/authController');

router.post('/login', login);
router.post('/signup', signUp);
router.get('/me', verifyAuth, me);
router.post('/me/logout',verifyAuth, logout);
router.post('/me/logoutall',verifyAuth, logoutAll);

module.exports = router;
