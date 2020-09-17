
const express = require('express')
const router = express.Router();


const authcontroller = require('../controller/auth.controller');

router.post('/register', authcontroller.register);
router.post('/login', authcontroller.login);


router.post('/reset-password', authcontroller.rest_pwd )

router.post('/new-password',  authcontroller.new_password)


module.exports = router;


