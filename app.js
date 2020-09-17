const express = require('express')
const app = express()
const bcrypt = require('bcryptjs');
const multer = require("multer");
const path = require("path");

const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const resetRoute = require('./routes/reset')
const user = require('./routes/user');
  const ticket_booking=require('./routes/ticket_booking');
  const flight_reschedule=require('./routes/flight_reschedule')

const mongoose = require('mongoose')
const ejs = require('ejs')

const User = require('./models/User')

const passport = require('passport')


const fbauth = require('./routes/fbauth')
const bookingRoute = require('./routes/booking')
const paymentRoute = require('./routes/payment')
const menuRoute = require('./routes/menu')
const ratingRoute = require('./routes/rating')

const passportSet = require('./config/passport-setup')
const facebookSetup = require('./config/facebook-setup')


dotenv.config()


mongoose.connect("mongodb+srv://adeel_11:ahmd1111@cluster0.8yxc5.mongodb.net/auth?retryWrites=true&w=majority",
    {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }, (error , clint)=>{
        if(error){
       return console.log("Unable  to conect to db")
        }
        console.log("contected to db")
  
  })

 app.use(express.json())

 //Route middlewae




 app.use('/', resetRoute)
 app.use('/' , fbauth)


 app.use('/api/user' , authRoute)
 app.use('/api/posts', postRoute)

 app.use('/api/booking' , bookingRoute)
 app.use('/api/payment' , paymentRoute)
 app.use('/api/menu' , menuRoute)
 app.use('/api/rating' , ratingRoute)

 
app.use('/user',user);
app.use('/ticket_booking',ticket_booking);
app.use('/flight_reschedule',flight_reschedule);


 app.set("view engine","ejs")


// storage engine 

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
  })
  
  const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000000
    }
  })
  
  app.use('/profile', express.static('upload/images'));
  app.post("/upload", upload.single('profile'), (req, res) => {
  
      res.json({
          success: 1,
          profile_url: `http://localhost:5000/profile/${req.file.filename}`
      })
  })
  
  function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}
app.use(errHandler);

const port = process.env.PORT || 5000;
app.listen(port,() => {
    console.log(`App is runing at ${port}`)

})

