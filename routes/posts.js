var express = require('express');
var router = express.Router();
const postController = require('../controller/posts.controller')
const verify = require('../middleware/verifyToken')


 router.get('/', verify, postController.verify_posts );



module.exports = router

