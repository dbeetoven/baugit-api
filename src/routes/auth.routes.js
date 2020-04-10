const express = require('express');
const router = express.Router();
const verifyAuth=require('../middlewares/verifyAuth')
const { login, logout, logoutAll, signUp,me } = require('../controllers/authController');

router.post('/auth/login', login);
router.post('/auth/signup', signUp);
router.get('/auth/me', verifyAuth, me);
router.post('/auth/me/logout',verifyAuth, logout);
router.post('/auth/me/logoutall',verifyAuth, logoutAll);

module.exports = router;
