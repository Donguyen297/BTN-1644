var mongoose = require('mongoose');
var carchema = mongoose.Schema(
   {
      name_car: {
         type: String,
      },
      Color: {
         type: String,
      },
      Brand: {
         type: String,
      },
      image: String,
      yom: String
   }
);
var CarModel = mongoose.model('car', carchema, 'car');
module.exports = CarModel;