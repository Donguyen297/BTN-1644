var express = require('express');
var router = express.Router();

const ToyModel = require('../models/ToyModel');
router.get('/', async (req, res) => {
  // SQL : SELECT * FROM toy
  var toy = await ToyModel.find();
  //res.send(toy);
  // render ra file view : views/custumer/index.hbs và gửi kèm data thông qua biến 'toy'
  res.render('custumer/index', { toy: toy });
})
router.get('/detail/:id', async (req, res) => {
  var id = req.params.id;
  // SELECT * FROM toy WHERE id = 'id'
  var toy = await ToyModel.findById(id);
  res.render('custumer/detail', { toy: toy });
})
module.exports = router;
