const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/post.controller');
const authJwt = require('../middlewares/verifyJwtToken');

router.post('/',[authJwt.verifyToken], postCtrl.create);
router.get('/', postCtrl.getAll);


module.exports = router;