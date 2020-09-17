
const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const cookieSession = require('cookie-session')
const isLoggedIn = require('../middleware/islogged')

const fbauthcontroller = require('../controller/fbauth.controller')

app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}))
 
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' }));
app.use(passport.initialize());
app.use(passport.session()); 


app.get('/profile', isLoggedIn, fbauthcontroller.profile);

app.get('/success', isLoggedIn, fbauthcontroller.success);

app.get('/',  fbauthcontroller.index);
app.get('/failed',  fbauthcontroller.failed);

app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

app.get('/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/profile',
    failureRedirect : '/'
  }));
 
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/success');
  }
); 

app.get('/logout',  fbauthcontroller.logout);

module.exports = app


