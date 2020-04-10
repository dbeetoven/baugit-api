const express = require('express');
const router = express.Router();
const { findAll, create } = require('../controllers/profilController');
const verifyAuth = require('../middlewares/verifyAuth');

router.post('/create', verifyAuth,create);
router.get('/findAll', verifyAuth,findAll);

module.exports = router;
