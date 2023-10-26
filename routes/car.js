var express = require('express');
var router = express.Router();

const carModel = require('../models/CarModel');

// URL : localhost:3001/car
router.get('/', async (req, res) => {
   // SQL : SELECT * FROM car
   var car = await carModel.find();
   //res.send(car);
   // render ra file view : views/car/index.hbs và gửi kèm data thông qua biến 'car'
   res.render('car/index', { car: car });
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   // SELECT * FROM car WHERE id = 'id'
   var car = await carModel.findById(id);
   res.render('car/detail', { car: car });
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   await carModel.findByIdAndDelete(id);
   console.log('Delete car succeed');
   res.redirect('/car');
})

router.get('/add', (req, res) => {
   res.render('car/add');
})

router.post('/add', async (req, res) => {
   var car = req.body;
   console.log(car)
   let a = await carModel.create(car);
   console.log(a)
   console.log('Add car succeed !');
   res.redirect('/car');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var car = await carModel.findById(id);
   res.render('car/edit', { car: car })
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var car = req.body;
   await carModel.findByIdAndUpdate(id, car);
   console.log('Update car succeed !');
   res.redirect('/car');
})

router.post('/search', async (req, res) => {
   var keyword = req.body.name_car;
   //relative search
   var car = await carModel.find({ name_car: new RegExp(keyword, "i") });
   res.render('car/index', { car: car });
})

router.get('/nameasc', async (req, res) => {
   //1: ascending,  -1: descending
   var car = await carModel.find().sort({ name: 1 });
   res.render('car/index', { car: car });
})

router.get('/namedesc', async (req, res) => {
   var car = await carModel.find().sort({ name: -1 });
   res.render('car/index', { car: car });
})

module.exports = router;