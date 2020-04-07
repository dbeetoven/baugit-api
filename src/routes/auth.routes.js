const express = require('express');
const router = express.Router();
const {  createUser,siginUser,} = require('../controllers/userController');

router.post('/login',siginUser );
router.post('/signup', createUser);

module.exports = router;
