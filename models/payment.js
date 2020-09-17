const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    paymode: {
        type: String,
        
    },
    paymentStatus: String,
    pdiscount:String,
    ptotal: String,

    
});

module.exports = mongoose.model('Payment', paymentSchema);