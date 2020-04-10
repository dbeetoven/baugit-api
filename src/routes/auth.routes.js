const express = require('express');
const router = express.Router();
const { login,logout,logoutAll,signUp } = require('../controllers/authController');

router.post('/login', login);
router.post('/signup', login);

module.exports = router;
