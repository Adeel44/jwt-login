
var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const crypto = require('crypto')

const User = require('../models/User')
const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')

const{registerValidation , loginValidation} = require('../validation')

const transporter = nodemailer.createTransport(sendgridTransport({
  auth:{
      api_key:"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"
  }
}))


  router.post('/register', async (req, res) =>{

    const {error}= registerValidation(req.body)
   if(error) return res.send(error.details[0].message);
   // checking if email already exist
   const emailExist = await User.findOne({email:req.body.email})
   if(emailExist) return res.status(400).send("Email already exist")

   // hash the password
   const salt = await bcrypt.genSalt(10);
   const hashPassword = await bcrypt.hash( req.body.password, salt);



      const user = new User({
          name:req.body.name,
          email:req.body.email,
          authMethod:"jwt",
          password:hashPassword
      })
      try{
          const savedUser = await user.save()
          res.send({user:user._id})

      }catch(err){
          res.status(400).send(err)
      }

  })

  router.post('/login', async (req, res) =>{

    const {error}= loginValidation(req.body)
    if(error) return res.send(error.details[0].message);

      // checking if email already exist
   const user = await User.findOne({email:req.body.email})
   if(!user) return res.status(400).send("Email not found")

   // Checing password
   const validPass = await bcrypt.compare( req.body.password, user.password); //  true
   if(!validPass) return res.status(400).send("invalid password")

   // Create and assaign token
   const  token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
   res.header('auth-token' , token).send(token)

   // res.send("Log in")
   //bcrypt.compareSync("not_bacon", hash); // false


  })


  router.post('/reset-password', async (req,res)=>{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            user.resetToken = token
            user.expireToken = Date.now() + 6600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:req.body.email,
                    from:"adeel99ahmed@yopmail.com",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:5000/reset/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message:"check your email"})
            })

        })
    })
})

router.post('/new-password',(req,res)=>{ 


  const newPassword = req.body.password
    const sentToken = req.body.resetToken
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated successfully"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
 
})



  module.exports = router;


