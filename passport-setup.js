// const mongoose = require('mongoose')
// const User = mongoose.model('User')

const User = require('./models/User')
const passport = require('passport')
const bcrypt = require('bcryptjs');

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
passport.serializeUser(function(user, done) {
    /*
    From the user take just the id (to minimize the cookie size) and just pass the id of the user
    to the done callback
    PS: You dont have to do it like this its just usually done like this
    */
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    
    done(null, user);
});

passport.use(new GoogleStrategy({
    clientID:     "754121550710-fliq1occ1a6c9ueu2f981sj3kj6lq6h0.apps.googleusercontent.com",
    clientSecret: "U3XH_cDpbVGp-K0kyMiY5yH4",
    callbackURL: "http://localhost:5000/google/callback",
    passReqToCallback   : true
  },
    (request, accessToken, refreshToken, profile, done)=>{
    console.log("accessToken" , accessToken)
        console.log("profile" , profile)
        console.log("done" , done)
    User.findOne({googleId:profile.id})
    .then((existingUser)=>{
         if(existingUser){
             done(null,existingUser)
         }else{
            const saltRounds = 10;
            var password = "333111122222"
            bcrypt.genSalt(saltRounds, (err, salt) => {
               bcrypt.hash(password, salt, (err, hash) => {
                   // Now we can store the password hash in db.
                   console.log(hash)
                   new User({
                
                    googleId:profile.id,
                    username:profile.displayName,
                    email: profile._json.email,
                    name: profile._json.name,
                    pic: profile._json.picture ,
                    password: hash ,
                    authMethod: "google" 
                   
                })   
                .save()
                .then((user)=>{
                    done(null,user)
                })
               });
           });
              

         }
    })

   }
   )
   
)



















