var express = require('express');
const UserModel = require('../models/UserModel');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
})

router.post('/', async (req, res) => {
  //lấy thông tin từ form login
  // var username = req.body.username;
  // var password = req.body.password;

  //lấy dữ liệu user từ db
  // var users = await UserModel.find();
  // tạo biến boolean để check login
  // var login = false;
  // Cách 1: chạy vòng lặp for để kiểm tra thông tin login
  // có match với dữ liệu của bảng user trong db không
  // for (let i = 0; i < users.length; i++) {
  //   if (username == users[i].username && password == users[i].password) {
  //     login = true;
  //     break;
  //   }
  // }

  // Cách 2: dùng hàm findOne của mongoose
  var login = await UserModel.findOne(
    {
      username: req.body.username,
      password: req.body.password
    }
  )
  //điều hướng web khi login succeed (vào trang admin) hoặc login fail (về lại trang login)
  if (login)  //login == true
    res.redirect('/toy')
  else
    res.redirect('/');
})

module.exports = router;
