const express = require('express');
const router = express.Router();
const profilCtrl = require('../controllers/profil.controller')
const authJwt = require('../middlewares/verifyJwtToken');

router.post('/',[authJwt.verifyToken],profilCtrl.create);
router.get('/:id',[authJwt.verifyToken],profilCtrl.getById);
router.get('/',[authJwt.verifyToken],profilCtrl.getAll);
router.put('/:id',[authJwt.verifyToken],profilCtrl.update);
router.delete('/:id',[authJwt.verifyToken],profilCtrl.deleteById);

module.exports = router;