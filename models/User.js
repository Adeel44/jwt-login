const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    uid: String,
    token: String,
    email: String,
    name: String,
    gender: String,
    pic: String ,
    password: String,
    authMethod: String ,
    role:String,
    date:{
                type:Date,
                default:Date.now
            },
    googleId : String ,
    resetToken:String,
    expireToken:Date
    
   
});

module.exports = mongoose.model('User', userSchema);
