const express =require('express');
const router = express.Router();
const verifyAuth = require('../middlewares/verifyAuth');

const {nationality} = require('../controllers/nationalityController')
const {postCategory} = require('../controllers/postCategoryController')

router.get('/nationality',verifyAuth,nationality);
router.get('/postCategory',verifyAuth,postCategory);


module.exports=router;
