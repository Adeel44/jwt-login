
module.exports = function isLoggedIn (req , res , next) {

      // if user is authenticated in the session, carry on
      console.log(req.isAuthenticated())
      if (req.isAuthenticated())
           return next();
           
           res.redirect('/');
         
 }
 


// //  route middleware to make sure
// function isLoggedIn(req, res, next) {

//     // if user is authenticated in the session, carry on
//     console.log(req.isAuthenticated())
//      if (req.isAuthenticated())
//           return next();
          
//           res.redirect('/');
//     }
