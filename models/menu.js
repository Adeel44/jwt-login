const mongoose = require('mongoose');

const menuSchema = mongoose.Schema({
    images: [{ 
        imageUrl: String 
      }] ,

    menuid: String,
    name: String,
    description:String,
    
});

module.exports = mongoose.model('Menu', menuSchema);
