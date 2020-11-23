const express     = require('express');
const router      = express.Router();
const bcrypt      = require('bcrypt')
const passport    = require('passport')
const ensureLogin = require('connect-ensure-login')

const User = require('../models/User')

//GET SIGN UP
router.get('/signup', (req, res, next) => res.render('auth/Access/signup'));

//POST SIGN UP
router.post('/signup', (req, res) => {
  const {username, password} = req.body
  if(username === '' || password === ''){
    res.render('auth/Access/signup', {errorMessage: 'You have to fill all the fields'})
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
        res.render('auth/Access/signup', {errorMessage: 'This user already exists. Please, try again'})
      }
    })
    .catch((err) => res.send(err)) 
})

//GET LOG IN
router.get('/login', (req, res) => {
  res.render('auth/Access/login', {errorMessage: req.flash('error')})
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


router.get('/', (req, res, next) => {
  res.render('home',{ user: req.user })

});

router.get('/cocktails', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/Cocktails/cocktails', { user: req.user })
})

router.get('/cocktails/alcohol', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/Cocktails/alcohol', { user: req.user })
})

router.get('/cocktails/no-alcohol', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/Cocktails/no-alcohol', { user: req.user })
})

router.get('/cocktails/no-alcohol/details/:id', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/Cocktails/details', { user: req.user })
})

router.get('/cocktails/alcohol/details/:id', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/Cocktails/details', { user: req.user })
})

router.get('/myprofile', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/MyAccount/myprofile', { user: req.user })
})

router.get('/mycocktails', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/MyAccount/mycocktails', { user: req.user })
})

router.get('/myaccount/myfavourites', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/MyAccount/myfavourites', { user: req.user })
})









module.exports = router;


