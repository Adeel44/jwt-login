const User = require('../models/User')
const bcrypt = require('bcryptjs');

const passport = require('passport')

const facebookStrategy = require('passport-facebook').Strategy



passport.use(new facebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID        : "725158081385874",
    clientSecret    : "00fa83b5ff3325647e57410bcbe52d90",
   callbackURL     : "http://localhost:5000/facebook/callback",
   profileFields: ['id', 'displayName', 'name', 'gender', 'picture.type(large)','email']

},// facebook will send back the token and profile
function(token, refreshToken, profile, done) {

   // asynchronous
  process.nextTick(function() {

       // find the user in the database based on their facebook id
       User.findOne({ 'uid' : profile.id }, function(err, user) {

         
           if (err)
               return done(err);

           // if the user is found, then log them in
           if (user) {

              
               console.log("user found")
               console.log(user)
               return done(null, user); // user found, return that user
           } else {


               // if there is no user found with that facebook id, create them
               var newUser  = new User();

               // set all of the facebook information in our user model
               newUser.uid    = profile.id; // set the users facebook id                   
               newUser.token = token;                   
               newUser.name  = profile.name.givenName ; 
               newUser.email = profile.emails[0].value; 
               newUser.gender = profile.gender
               newUser.pic = profile.photos[0].value
               newUser.authMethod = "facebook"
               // save our user to the database

              

               
               const saltRounds = 10;
var password = "111111122222"
 //   newUser.password = password
bcrypt.genSalt(saltRounds, (err, salt) => {
   bcrypt.hash(password, salt, (err, hash) => {
       // Now we can store the password hash in db.
       console.log(hash)
       newUser.password = hash;

       newUser.save(function(err) {
           if (err)
               throw err;

           // if successful, return the new user
           return done(null, newUser);
       });


   });
});
   
                
            }

        });

    })

    }));


passport.serializeUser(function(user, done) {
   done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
   User.findById(id, function(err, user) {
       done(err, user);
   });
});
