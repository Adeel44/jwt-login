

const User = require('../models/User')

module.exports.verify_posts =  (req, res) => {

        res.send(req.user)
    
}

