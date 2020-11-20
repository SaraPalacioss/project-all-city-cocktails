const express = require('express');
const router  = express.Router();

/* GET home page */



router.get('/', (req, res, next) => {
  res.render('parental')
  // if(parental>18){
  //   console.log('ok')
  // }else{
  //   console.log('mal')
  // }
});


router.get('/home', (req, res, next) => {
  res.render('home')
  // if(parental>18){
  //   console.log('ok')
  // }else{
  //   console.log('mal')
  // }
});








module.exports = router;




