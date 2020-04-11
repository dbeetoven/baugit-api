const express = require('express');
const router = express.Router();
const { findAll, create,getById,update,remove } = require('../controllers/profilController');
const verifyAuth = require('../middlewares/verifyAuth');

router.post('/', verifyAuth,create);
router.get('/', verifyAuth,findAll);
router.get('/:id', verifyAuth,getById);
router.put('/:id', verifyAuth,update);
router.delete('/:id', verifyAuth,remove);

module.exports = router;
