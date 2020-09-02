const mongoose = require('mongoose');

// const userScheme = new mongoose.Schema({
//     name:{
//         type:String,
//         required:true,
//         min:5,
//         max:200
//     },
//     email:{
//         type:String,
//         required:true,
//         min:6,
//         max:200,
//     },
//     password:{
//         type:String,
//         required:true,
//         min:6,
//         max:1000
//     },
//     date:{
//         type:Date,
//         default:Date.now
//     }
//     ,
//     uid: String,
//     token: String,
//     email: String,
//     name: String,
//     gender: String,
//     pic: String

// })

// module.exports = mongoose.model('User', userScheme)


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
