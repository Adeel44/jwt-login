const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
    
    userid : String,
    avgrating: String,
    totalrating:String,
    ratingtype:String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
 
});

module.exports = mongoose.model('Rating', ratingSchema);