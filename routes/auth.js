const express     = require('express');
const router      = express.Router();
const bcrypt      = require('bcrypt')
const passport    = require('passport')
const ensureLogin = require('connect-ensure-login')

const User = require('../models/User');
const Cocktails = require('../models/Cocktails');


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


//GET LOG OUT

router.get('/myaccount/logout', (req, res)=>{
  req.logout()
  res.redirect('/')
})

//GET HOME

router.get('/', (req, res, next) => {
  res.render('home',{ user: req.user })

});

//GET COCKTAILS MENU

router.get('/cocktails', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/Cocktails/cocktails', { user: req.user })
})

//GET COCKTAILS/ALCOHOL

router.get('/cocktails/alcohol', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/Cocktails/alcohol', { user: req.user })
})

//GET COCKTAILS/NO-ALCOHOL

router.get('/cocktails/no-alcohol', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/Cocktails/no-alcohol', { user: req.user })
})

//GET COCKTAILS/ALCOHOL/DETAILS
router.get('/cocktails/alcohol/details/:id', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/Cocktails/details', { user: req.user })
})

//GET COCKTAILS/NO-ALCOHOL/DETAILS

router.get('/cocktails/no-alcohol/details/:id', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/Cocktails/details', { user: req.user })
})

//GET MYACCOUNT/MYPROFILE

router.get('/myaccount/myprofile', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/MyAccount/myprofile', { user: req.user })
})

//GET MYACCOUNT/MYCOCKTAILS

// router.get('/myaccount/mycocktails', ensureLogin.ensureLoggedIn(), (req, res)=>{
//   res.render('auth/MyAccount/mycocktails', { user: req.user })
// })

router.get('/myaccount/mycocktails', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  Cocktails.find({}, {strDrink: 1})
  .then((cocktail) => {
    console.log(cocktail)
    res.render('auth/MyAccount/mycocktails', {cocktail});
    
  })
  .catch((err) => {
    console.log(err)
    res.render('error')
  })
  
})

//POST  MYACCOUNT/MYCOCKTAILS

router.post('/myaccount/mycocktails', ensureLogin.ensureLoggedIn(), (req, res, next)=>{
  const { strDrink,strCategory,strAlcoholic,strGlass,strInstructions,strIngredient1,strIngredient2,strIngredient3,strIngredient4,strIngredient5,strIngredient6,strIngredient7,strIngredient8,strIngredient9,strIngredient10,strIngredient11,strIngredient12,strIngredient13,strIngredient14,strIngredient15,strMeasure1,strMeasure2,strMeasure3,strMeasure4,strMeasure5,strMeasure6,strMeasure7,strMeasure8,strMeasure9,strMeasure10,strMeasure11,strMeasure12,strMeasure13} = req.body
  const newCocktail = req.body
  Cocktails.create(newCocktail)
  .then((result)=>{
    res.redirect('/myaccount/mycocktails')
  })
  .catch((err)=> {
    console.log(err)
    res.render('error');
  })
  });

// RENDER NEW COCKTAIL FORM
router.get('/myaccount/new-cocktail', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/MyAccount/newCocktailForm', { user: req.user })
})

//GET MYACCOUNT/MYFAVOURITES

router.get('/myaccount/myfavourites', ensureLogin.ensureLoggedIn(), (req, res)=>{
  res.render('auth/MyAccount/myfavourites', { user: req.user })
})


// GET ALL CELEBRITIES LIST
router.get('/myaccount/mycocktails', (req, res, next) => {
  Celebrity.find({}, {name: 1})
  .then((cocktail) => {
    console.log(cocktail)
    res.render('/myaccount/mycocktails/:id', {cocktail});
    
  })
  .catch((err) => {
    console.log(err)
    res.render('error')
  })
  
})

// GET MYCOCKTAILS INFO
router.get('/myaccount/mycocktails/details/:id', (req, res, next) =>{
  const id = req.params.id
  Cocktails.findById(id)
  .then((result)=>{
    res.render('auth/MyAccount/details', result);
  })

  .catch((err)=> {
    console.log(err)
    res.render('error')
})
})

// RENDER EDIT COCKTAIL FORM
router.get('/myaccount/mycocktails/details/:id/edit', (req, res, next)=>{
  const id = req.params.id
  Cocktails.findById(id)
  .then((result)=>{
      res.render('auth/MyAccount/editCocktailForm', result)
  })
  .catch((err)=>{
      console.log(err)
      res.render('error')
  })
  
})

//EDIT COCKTAIL  
router.post('/myaccount/mycocktails/details/:id/edit', (req, res, next)=>{
  const id = req.params.id
  const editedCocktail = req.body
  Cocktails.findByIdAndUpdate(id, editedCocktail)
  .then(()=>{
    res.redirect('/myaccount/mycocktails')
  })
  .catch((err)=>{
    console.log(err)
    res.render('error')
  })

})


// DELETE COCKTAIL
router.post('/myaccount/mycocktails/details/:id/delete', (req, res, next) =>{
  const id = req.params.id
  Cocktails.findByIdAndRemove(id)
  .then(()=>{
    res.redirect('/myaccount/mycocktails');
  })
  .catch((err)=> {
      console.log(err)
      res.render('error')
  })
})


module.exports = router;


