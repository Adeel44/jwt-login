const app = require('express')();

const userController = require('../controller/user.controller');
const User = require('../models/User');

app.post('/',  userController.user_create );


 app.post('/create', userController.create);
 app.get('/findall', userController.findAll);
 app.get('/:id', userController.findOne);
 app.put('/:id', userController.update);

 app.delete('/:id', userController.delete);


module.exports = app;

