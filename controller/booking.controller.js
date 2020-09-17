const Booking = require('../models/booking')
const User = require('../models/User')
const error = require('../constant/error')


module.exports.create = (req, res) => {

    User.findById(req.body.userId)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
       }
       const booking = new Booking({

        menuid: req.body.menuid,
        userid: req.body.userid,
        paymentStatus: req.body.paymentStatus,
        bookingStatus: req.body.bookingStatus,
        user: req.body.userId
                  
        })
      
      return booking.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Booking stored",
        createdBooking: {
          _id: result._id,
          user: result.user,
        paymentStatus: req.body.paymentStatus,
        bookingStatus: req.body.bookingStatus,
        }
        
      });
    })
    .catch(err => {
      let errorObject = error.getErrorMessage(err)
      res.status(errorObject.code).send({ message: errorObject.message, data: {} })
  
    });
     


    // const booking = new Booking({

    //     menuid: req.body.menuid,
    //     userid: req.body.userid,
    //     paymentStatus: req.body.paymentStatus,
    //     bookingStatus: req.body.bookingStatus,
                  
    //     })
    
    //     booking.save()
    //     .then(data => {
    //         if (!data || data == null) {
    //             return res.status(200).send({
    //                 message: "Records Not Saved",
    //                 data: {},
    //                 status: 'error'
    //             });
    //         }
    //         res.status(200).send({
    //             message: "Record saved successfully",
    //             status: 'status',
    //             data: data
    //         })
    //     })
    //     .catch(err => {
    //         res.status(400).json({
    //           error: err
    //         });
    //       }); 

}


module.exports.findAll = (req, res) => {

    Booking.find()
    .populate("user")
    
        .then(data => {
            if (!data || data == null) {
                return res.status(200).send({
                    message: "Records Not Found",
                    data: [],
                    status: 'error'
                });
            }
            res.status(200).send({
                message: 'successfully fetched!',
                data: data,
                status: "success"
            })
        })
        .catch(err => {
          let errorObject = error.getErrorMessage(err)
          res.status(errorObject.code).send({ message: errorObject.message, status: 'error' })
      }) 

    
}

module.exports.findOne = (req, res) => {

    Booking.findById(req.params.id)
    .populate("user")

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

module.exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
            message: "Record Must Not be Empty",
            status: 'error'
        });
    }

    let new_data = req.body;

    Booking.findByIdAndUpdate(req.params.id, { $set: new_data }, { new: true , useFindAndModify: false })
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

    Booking.findByIdAndRemove(req.params.id)
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