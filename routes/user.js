const app = require('express')();
const User = require('../models/User');
 const _ = require('lodash');
const jwt = require('jsonwebtoken');
app.post('/', async (req, res, next) => {
try {
    // req.body.role
    
const user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']));
await user.save();
const token = jwt.sign({ _id: user._id, role: user.role }, "secretkey");
res.header('x-auth-header', token).send(_.pick(user, ['name', 'email', 'password']));
}
catch (ex) {
res.status(401).send("User unable to get auth token::");
}})
module.exports = app;

