const express = require('express');
const router = express.Router();
const {create,findAll,remove,update} = require('../controllers/postController');

const verifyAuth = require('../middlewares/verifyAuth');

router.post('/create', verifyAuth,create);
router.delete('/:id', verifyAuth,remove);
router.update('/:id', verifyAuth,update);
router.get('/findAll', verifyAuth,findAll);

module.exports = router;
