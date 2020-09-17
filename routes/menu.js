const express = require('express')
const router = express.Router();

const menuController = require('../controller/menu.controller');


router.post('/create', menuController.create);
router.get('/findall', menuController.findAll);
router.get('/:id', menuController.findOne);
router.put('/:id', menuController.update);
router.delete('/:id', menuController.delete);

 module.exports = router;
