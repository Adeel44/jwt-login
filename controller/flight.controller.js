const User = require('../models/User')

module.exports.flight_change =  (req, res , next) => {

    res.status(200).send("flight rescheduled");
  
}

