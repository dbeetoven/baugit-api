const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/postController');

const verifyAuth =require ('../middlewares/verifyAuth');
router.post('/buses', verifyAuth, addBusDetails);
router.get('/buses', verifyAuth, getAllBuses);



module.exports = router;
