const app=require('express')();
const ticketController = require('../controller/ticket.booking.controller')
const autherization =require('../middleware/autherization');

// app.post('/',autherization, (req, res, next)=>{
// res.status(200).send("Ticket Booked")})


app.post('/', autherization , ticketController.ticket_booking);
module.exports=app;

