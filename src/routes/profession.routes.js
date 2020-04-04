const express = require('express');
const router = express.Router();
const professionCtrl = require('../controllers/profession.controller');
const authJwt = require('../middlewares/verifyJwtToken');

router.post('/', professionCtrl.create);
router.get('/', [authJwt.verifyToken], professionCtrl.getAll);


module.exports = router;