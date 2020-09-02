var express = require('express');
var router = express.Router();

router.get('/reset/:id',  (req,res)=>{

    res.json({test:123})
})


module.exports = router

