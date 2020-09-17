const express = require('express')
const router = express.Router();

const bookingController = require('../controller/booking.controller');


router.post('/create', bookingController.create);
router.get('/findall', bookingController.findAll);
router.get('/:id', bookingController.findOne);
router.put('/:id', bookingController.update);
router.delete('/:id', bookingController.delete);



 module.exports = router;





