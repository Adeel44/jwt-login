const app=require('express')();
const autherization =require('../middleware/autherization');

app.post('/',autherization, (req, res, next)=>{
res.status(200).send("Ticket Booked")})
module.exports=app;

