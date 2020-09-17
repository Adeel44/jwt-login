const express = require('express')
const router = express.Router();

const ratingController = require('../controller/rating.controller');


router.post('/create', ratingController.create);
router.get('/findall', ratingController.findAll);
router.get('/:id', ratingController.findOne);
router.put('/:id', ratingController.update);
router.delete('/:id', ratingController.delete);

 module.exports = router;

