const express = require('express');
const router = express.Router();
const supportCtrl = require('../controllers/support.controller');
const authJwt = require('../middlewares/verifyJwtToken');

router.post('/', supportCtrl.create);
router.get('/', [authJwt.verifyToken], supportCtrl.getAll);


module.exports = router;