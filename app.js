require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const chalk        = require('chalk');
const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session       = require('express-session');
const MongoStore            = require('connect-mongo')(session)

const bcrypt        = require('bcrypt')
const connect        = require('connect-ensure-login')
const flash         = require('connect-flash')



mongoose
  .connect(`mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.jwvcc.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
  
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

//CONFIGURACIÓN DE LAS COOKIES
app.use(session({
  secret: "basic-auth-secret",
  cookie: { maxAge: 60000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 
  })
}));

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Middleware de Session
app.use(session({secret: 'ourPassword', resave: true, saveUninitialized: true}))

//Middleware para serializar al usuario
passport.serializeUser((user, callback)=>{
  callback(null, user._id)
})

//Middleware para des-serializar al usuario
passport.deserializeUser((id, callback)=>{
  User.findById(id)
    .then((user) => callback(null, user))
    .catch((err) => callback(err))
})

//Middleware de flash
app.use(flash())

//Middleware del Strategy
passport.use(new LocalStrategy({passReqToCallback: true}, (req, username, password, next)=>{
  User.findOne({username})
    .then((user)=>{

      if(!user){
        return next(null, false, {message: "Incorrect username"})
      }

      if(!bcrypt.compareSync(password, user.password)){
        return next(null, false, {message: "Incorrect password"})
      }

      return next(null, user)
    })
    .catch((err) => next(err))
}))

//Middleware de passport
app.use(passport.initialize())
app.use(passport.session())




// Express View engine setup

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));
      

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));



// default value for title local
app.locals.title = 'All city cocktails';

const User = require('./models/User');


const index = require('./routes/index');
app.use('/', index);

const auth = require('./routes/auth')
app.use('/', auth);



module.exports = app;


//LISTENER-----------------------------------------------
app.listen(process.env.PORT, ()=>{
  console.log(chalk.green.inverse.bold(`Conectado al puerto ${process.env.PORT}`));
});
