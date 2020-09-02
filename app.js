const express = require('express')
const app = express()
const bcrypt = require('bcryptjs');

const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const resetRoute = require('./routes/reset')
const user=require('./routes/user');
  const ticket_booking=require('./routes/ticket_booking');
  const flight_reschedule=require('./routes/flight_reschedule')



dotenv.config()

const mongoose = require('mongoose')

const User = require('./models/User')

const passport = require('passport')
const session = require('express-session')
const cookieSession = require('cookie-session')


mongoose.connect(process.env.DB_CONNECT,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (error , clint)=>{
        if(error){
       return console.log("Unable  to conect to db")
        }
        console.log("BD conect")
  
  })

  app.use(express.json())

 //Route middlewae
 app.use('/', resetRoute)
 app.use('/api/user' , authRoute)
 app.use('/api/posts', postRoute)

app.use('/createuser',user);
app.use('/ticket_booking',ticket_booking);
app.use('/flight_reschedule',flight_reschedule);


//  const saltRounds = 10;
//  var password = "333111122222"
//  bcrypt.genSalt(saltRounds, (err, salt) => {
//     bcrypt.hash(password, salt, (err, hash) => {
//         // Now we can store the password hash in db.
//         console.log(hash)
//     });
// });
        

const passportSet = require('./passport-setup')
const facebookStrategy = require('passport-facebook').Strategy


app.use(cookieSession({
    name: 'tuto-session',
    keys: ['key1', 'key2']
  }))

app.set("view engine","ejs")

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
    app.use(passport.session()); 



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

app.get('/api', (req , res)=>{
    res.json({
        message:" Hello message api"
    })
})



app.get('/profile', isLoggedIn, function(req, res) {
    console.log(req.user)
    res.render('profile', {
        user : req.user // get the user out of session and pass to template
    });
});


// route middleware to make sure
function isLoggedIn(req, res, next) {

	// if user is authenticated in the session, carry on
	if (req.isAuthenticated())
        return next();
        
        res.redirect('/');
}



app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/profile',
			failureRedirect : '/'
		}));

app.get('/',(req,res) => {
    res.render("index")
})




// Example protected and unprotected routes
app.get('/', (req, res) => res.render('/index'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/success', isLoggedIn, (req, res) =>{
    console.log("req.user",req.user)
    res.render('profilee',{name:req.user.name,pic:req.user.pic,email:req.user.email})
})

app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    
    res.redirect('/success');
  }
);

app.get('/logout', (req, res) =>{
    req.logout();
    res.redirect('/');
});


app.listen(5000,() => {
    console.log("App is listening on Port 5000")

})







// const express = require('express')

// const app = express()

// const passport = require('passport')

// const session = require('express-session')


// const facebookStrategy = require('passport-facebook').Strategy

// //app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
// app.use(passport.initialize());
// app.use(passport.session()); 

// passport.serializeUser(function(user, done) {
//     done(null, user);
// });

// // used to deserialize the user
// passport.deserializeUser(function(obj, done) {
//     done(null, obj)
    
// });


// passport.use(new facebookStrategy({



//     clientID        : "744133129819490",
//     clientSecret    : "82576ac946994c4b6d89c3b9970787af",
//     callbackURL     : "http://localhost:5000/fb/auth",
//     profileFields: ['id', 'displayName' ]

// },// facebook will send back the token and profile
// function(accessToken, refreshToken, profile, done) {
// console.log(accessToken , refreshToken , profile)
// const user = {}
// done(null , user)

// }));


// app.use('/login/fb', passport.authenticate('facebook'));

// app.use('/failed/login' , (req,res , next)=>{
//     res.send("log in failed")
// })

// app.use('/fb/auth', passport.authenticate('facebook' , { 
//     failureRedirect: '/failed/login'}), function(req , res ){
//         console.log(req.user, req.isAuthenticated())
//         res.send("log in to fb")

//     });
// app.use('/logout' , (req, res , next)=>{
//     req.logOut()
//     console.log(req.isAuthenticated())

//     res.send("User is log out")

// })
// app.use('/' , (req, res )=>{
   
//     res.send("chk")

// })

// app.listen(5000,() => {
//     console.log("App is listening on Port 5000")
// })

