const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    menuid: String,
    userid: String,
    paymentStatus: String,
    bookingStatus:String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
});

module.exports = mongoose.model('Booking', bookingSchema);
