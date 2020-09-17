const express = require('express')
const router = express.Router();

const paymentController = require('../controller/payment.controller');


router.post('/create', paymentController.create);
router.get('/findall', paymentController.findAll);
router.get('/:id', paymentController.findOne);
router.put('/:id', paymentController.update);
router.delete('/:id', paymentController.delete);

 module.exports = router;
