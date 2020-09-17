
const User = require('../models/User')

module.exports.ticket_booking =  (req, res , next) => {

    res.status(200).send("Ticket Booked")
  
}

