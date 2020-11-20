const express     = require('express');
const router      = express.Router();
const bcrypt      = require('bcrypt')
const passport    = require('passport')
const ensureLogin = require('connect-ensure-login')

const User = require('../models/User')

//GET SIGN UP
router.get('/signup', (req, res, next) => res.render('auth/signup'));

//POST SIGN UP
router.post('/signup', (req, res) => {
  const {username, password} = req.body
  if(username === '' || password === ''){
    res.render('auth/signup', {errorMessage: 'You have to fill all the fields'})
    return
  }

  User.findOne({username})
    .then((result) => {
      if(!result){
        bcrypt.hash(password, 10)
          .then((hashedPassword)=>{
            User.create({username, password: hashedPassword})
              .then(() => res.redirect('/home'))
          })       
      } else {
        res.render('auth/signup', {errorMessage: 'This user already exists. Please, try again'})
      }
    })
    .catch((err) => res.send(err)) 
})

//GET LOG IN
router.get('/login', (req, res) => {
  res.render('auth/login', {errorMessage: req.flash('error')})
})

//POST SIGN UP
router.post('/login', passport.authenticate("local", {
  successRedirect: '/home',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}))


router.get('/logout', (req, res)=>{
  req.logout()
  res.redirect('/')
})


router.get('/home', (req, res, next) => {
  res.render('home',{ user: req.user })

});

router.get('/private', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/private', { user: req.user })
})






module.exports = router;


