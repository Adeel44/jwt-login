const app=require('express')();
const autherization =require('../middleware/autherization');
const flightController = require('../controller/flight.controller')

// app.post('/',autherization,(req,res, next)=>{
// res.status(200).send("flight rescheduled");
// })


app.post('/', autherization , flightController.flight_change);
module.exports=app;

