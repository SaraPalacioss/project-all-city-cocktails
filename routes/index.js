const express = require('express');
const parental = require('../public/javascripts/script');
const router  = express.Router();

/* GET home page */



router.get('/', (req, res, next) => {
  res.render('index')
  // if(parental>18){
  //   console.log('ok')
  // }else{
  //   console.log('mal')
  // }
});

module.exports = router;




