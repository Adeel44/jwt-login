

module.exports.profile =  (req, res) => {

    console.log(req.user)
    res.render('profile', {
        user : req.user // get the user out of session and pass to template
    });

} 


module.exports.success =  (req, res) => {
    console.log("req.user",req.user)
    res.render('profilee',{name:req.user.name,pic:req.user.pic,email:req.user.email})

} 

module.exports.failed =  (req, res) => {
    res.send('You Failed to log in!')

} 
module.exports.index =  (req, res) => {
    res.render("index")

} 

module.exports.logout =  (req, res) => {
    req.logout();
    res.redirect('/');
    
} 






