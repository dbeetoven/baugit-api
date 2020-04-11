const express =require('express');
const router = express.Router();
const verifyAuth = require('../middlewares/verifyAuth');

const {nationality,setNationalitties} = require('../controllers/nationalityController')

router.get('/nationality',verifyAuth,nationality);


module.exports=router;
