const express     = require('express');
const router      = express.Router();
const bcrypt      = require('bcrypt')
const passport    = require('passport')
const ensureLogin = require('connect-ensure-login')

const User = require('../models/User')

//GET SIGN UP
router.get('/signup', (req, res, next) => res.render('signup'));

//POST SIGN UP
router.post('/signup', (req, res) => {
  const {username, password} = req.body
  if(username === '' || password === ''){
    res.render('signup', {errorMessage: 'You have to fill all the fields'})
    return
  }

  User.findOne({username})
    .then((result) => {
      if(!result){
        bcrypt.hash(password, 10)
          .then((hashedPassword)=>{
            User.create({username, password: hashedPassword})
              .then(() => res.redirect('/'))
          })       
      } else {
        res.render('signup', {errorMessage: 'This user already exists. Please, try again'})
      }
    })
    .catch((err) => res.send(err)) 
})

//GET LOG IN
router.get('/login', (req, res) => {
  res.render('login', {errorMessage: req.flash('error')})
})

//POST SIGN UP
router.post('/login', passport.authenticate("local", {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}))


router.get('/logout', (req, res)=>{
  req.logout()
  res.redirect('/')
})






module.exports = router;


