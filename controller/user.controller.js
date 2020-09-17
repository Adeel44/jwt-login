const User = require('../models/User')
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const error = require('../constant/error')


module.exports.user_create  = async (req, res , next) => {

    try {
        // req.body.role
        
    const user = new User(_.pick(req.body, ['name', 'email', 'password', 'role']));
    await user.save();
    const token = jwt.sign({ _id: user._id, role: user.role }, "secretkey");
    res.header('x-auth-header', token).send(_.pick(user, ['name', 'email', 'password']));
    }
    catch (ex) {
    res.status(401).send("User unable to get auth token::");
    }
  

}

module.exports.create = async (req, res) => {

    
   // checking if email already exist
   const emailExist = await User.findOne({email:req.body.email})
   if(emailExist) return res.status(400).send("Email already exist")

   // hash the password
   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash( req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email:req.body.email,
        password: hashPassword,
        role:req.body.role
          
    })
    
    user.save()
    .then(data => {
        if (!data || data == null) {
            return res.status(200).send({
                message: "Records Not Saved",
                data: {},
                status: 'error'
            });
        }
        res.status(200).send({
            message: "Record saved successfully",
            status: 'status',
            data: data
        })
    })
    .catch(err => {
        let errorObject = error.getErrorMessage(err)
        res.status(errorObject.code).send({ message: errorObject.message, data: {} })
    }) 
 
}


module.exports.findAll = (req, res) => {

    User.find()
    .then(data => {
        if (!data || data == null) {
            return res.status(200).send({
                message: "Records Not Saved",
                data: {},
                status: 'error'
            });
        }
        res.status(200).send({
            message: "Record saved successfully",
            status: 'status',
            data: data
        })
    })
    .catch(err => {
        let errorObject = error.getErrorMessage(err)
        res.status(errorObject.code).send({ message: errorObject.message, status: 'error' })
    }) 
}

module.exports.findOne = (req, res) => {

    User.findById(req.params.id)

    .then(data => {
            if (!data || data == null) {
                return res.status(200).send({
                    message: "Record not found",
                    data: {},
                    status: 'error'
                });
            }
            res.send({ data, message: 'successfully !', status: 'success' });
        })
        .catch(err => {
            let errorObject = error.getErrorMessage(err)
            res.status(errorObject.code).send({ message: errorObject.message, data: {}, status: 'error' })
        })
}

module.exports.update = async (req, res) => {

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash( req.body.password, salt);
    

    if (!req.body) {
        return res.status(400).send({
            message: "Record Must Not be Empty",
            status: 'error'
        });
    }

    let new_data = req.body;
    new_data.password = hashPassword

    User.findByIdAndUpdate(req.params.id, { $set: new_data }, { new: true , useFindAndModify: false})
        .then(data => {
            if (!data || data == null) {
                console.log(data)
                return res.status(200).send({
                    message: "Record not found",
                    data: {},
                    status: 'error'
                });
            }
            res.status(200).send({
                message: "Record Updated Successfully",
                data: data,
                status: 'success'
            });
        })
        .catch(err => {
            console.log(err)
            res.status(errorObject.code).send({ message: errorObject.message, status: 'error' })
        });

    
}

module.exports.delete = (req, res) => {

    User.findByIdAndRemove(req.params.id)
        .then(data => {
            if (!data || data == null) {
                return res.status(200).send({
                    message: "Record not found",
                    data: {},
                    status: 'error'
                });
            }
            res.status(200).send({ message: "Record deleted successfully!", data, status: 'success' });
        })
        .catch(err => {
            let errorObject = error.getErrorMessage(err)
            res.status(errorObject.code).send({ message: errorObject.message, status: 'error' })
        })

    
}
