var express = require('express');
var router = express.Router();

const ToyModel = require('../models/ToyModel');

// URL : localhost:3001/toy
router.get('/', async (req, res) => {
   // SQL : SELECT * FROM toy
   var toy = await ToyModel.find();
   //res.send(toy);
   // render ra file view : views/toy/index.hbs và gửi kèm data thông qua biến 'toy'
   res.render('toy/index', { toy: toy });
})

router.get('/detail/:id', async (req, res) => {
   var id = req.params.id;
   // SELECT * FROM toy WHERE id = 'id'
   var toy = await ToyModel.findById(id);
   res.render('toy/detail', { toy: toy });
})

router.get('/delete/:id', async (req, res) => {
   var id = req.params.id;
   await ToyModel.findByIdAndDelete(id);
   console.log('Delete toy succeed');
   res.redirect('/toy');
})

router.get('/add', (req, res) => {
   res.render('toy/add');
})

router.post('/add', async (req, res) => {
   var toy = req.body;
   console.log(toy)
   let a = await ToyModel.create(toy);
   console.log(a)
   console.log('Add toy succeed !');
   res.redirect('/toy');
})

router.get('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = await ToyModel.findById(id);
   res.render('toy/edit', { toy: toy })
})

router.post('/edit/:id', async (req, res) => {
   var id = req.params.id;
   var toy = req.body;
   await ToyModel.findByIdAndUpdate(id, toy);
   console.log('Update toy succeed !');
   res.redirect('/toy');
})

router.post('/search', async (req, res) => {
   var keyword = req.body.name_toy;
   //relative search
   var toy = await ToyModel.find({ name_toy: new RegExp(keyword, "i") });
   res.render('toy/index', { toy: toy });
})
router.post('/custumer/search', async (req, res) => {
   var keyword = req.body.name_toy;
   //relative search
   var toy = await ToyModel.find({ name_toy: new RegExp(keyword, "i") });
   res.render('custumer/index', { toy: toy });
})

router.get('/nameasc', async (req, res) => {
   //1: ascending,  -1: descending
   var toy = await ToyModel.find().sort({ name: 1 });
   res.render('toy/index', { toy: toy });
})

router.get('/namedesc', async (req, res) => {
   var toy = await ToyModel.find().sort({ name: -1 });
   res.render('toy/index', { toy: toy });
})

module.exports = router;