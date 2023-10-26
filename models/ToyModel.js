var mongoose = require('mongoose');
var toychema = mongoose.Schema(
   {
      name_toy: {
         type: String
      },
      price: {
         type: Number,
      },
      category: {
         type: String,
      },
      image: String
   }
);
var toyModel = mongoose.model('toy', toychema, 'toy');
module.exports = toyModel;