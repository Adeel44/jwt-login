var express = require('express');
var router = express.Router();
const verify = require('./verifyToken')

router.get('/' , verify ,(req , res)=>{

   res.send(req.user)
    // res.json({posts:{
    //     tittle: 'my first post',
    //     description:'random data u sould not access'
    // }})



})




module.exports = router

