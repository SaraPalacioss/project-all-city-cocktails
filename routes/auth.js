const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const ensureLogin = require("connect-ensure-login");

const User = require("../models/User");
const Cocktails = require("../models/Cocktails");

//GET SIGN UP
router.get("/signup", (req, res) => res.render("auth/Access/signup"));

//POST SIGN UP
router.post("/signup", (req, res) => {
  const { name, lastName, username, password } = req.body;
  if (name === "" || lastName === "" || username === "" || password === "") {
    res.render("auth/Access/signup", {
      errorMessage: "You have to fill all the fields",
    });
  }
  User.findOne({ username })
    .then((result) => {
      if (!result) {
        bcrypt.hash(password, 10).then((hashedPassword) => {
          User.create({
            name,
            lastName,
            username,
            password: hashedPassword,
          }).then(() => res.redirect("/login"));
        });
      } else {
        res.render("auth/Access/signup", {
          errorMessage: "This user already exists. Please, try again",
        });
      }
    })
    .catch((err) => res.send(err));
});

//GET LOG IN
router.get("/login", (req, res) => {
  res.render("auth/Access/login", { errorMessage: req.flash("error") });
});

//POST LOG IN
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true,
  })
);

//GET LOG OUT
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

//GET HOME
router.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

//GET COCKTAILS MENU
router.get("/cocktails", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("auth/Cocktails/cocktails", { user: req.user });
});

//GET ALL COCKTAILS
router.get(
  "/cocktails/allcocktails/",
  ensureLogin.ensureLoggedIn(),
  (req, res) => {
    res.render("auth/Cocktails/all-cocktails", { user: req.user });
  }
);

//GET COCKTAILS/ALCOHOL
router.get("/cocktails/alcohol", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("auth/Cocktails/alcohol", { user: req.user });
});

//GET COCKTAILS/NO-ALCOHOL
router.get(
  "/cocktails/no-alcohol",
  ensureLogin.ensureLoggedIn(),
  (req, res) => {
    res.render("auth/Cocktails/no-alcohol", { user: req.user });
  }
);

//GET COCKTAILS DETAILS
router.get(
  "/cocktails/details/:id",
  ensureLogin.ensureLoggedIn(),
  (req, res) => {
    res.render("auth/Cocktails/details", { user: req.user });
  }
);

//GET ALL COCKTAILS DETAILS
router.get(
  "/cocktails/allcocktails/details/:id",
  ensureLogin.ensureLoggedIn(),
  (req, res) => {
    res.render("auth/Cocktails/details", { user: req.user });
  }
);

//GET COCKTAILS/ALCOHOL/DETAILS
router.get(
  "/cocktails/alcohol/details/:id",
  ensureLogin.ensureLoggedIn(),
  (req, res) => {
    res.render("auth/Cocktails/details", { user: req.user });
  }
);

//GET COCKTAILS/NO-ALCOHOL/DETAILS
router.get(
  "/cocktails/no-alcohol/details/:id",
  ensureLogin.ensureLoggedIn(),
  (req, res) => {
    res.render("auth/Cocktails/details", { user: req.user });
  }
);

//GET MYACCOUNT/MYPROFILE
router.get("/myaccount/myprofile", ensureLogin.ensureLoggedIn(), (req, res) => {
  res.render("auth/MyAccount/myprofile", { user: req.user });
});

//GET MYACCOUNT/MYCOCKTAILS
router.get(
  "/myaccount/mycocktails",
  ensureLogin.ensureLoggedIn(),
  (req, res) => {
    Cocktails.find({ owner: req.user._id })
      .then((cocktail) => {
        res.render("auth/MyAccount/mycocktails", { cocktail, user: req.user });
      })
      .catch((err) => res.render("error"));
  }
);

//POST  MYACCOUNT/MYCOCKTAILS
router.post(
  "/myaccount/mycocktails",
  ensureLogin.ensureLoggedIn(),
  (req, res) => {
    const {
      strDrink,
      strCategory,
      strAlcoholic,
      strGlass,
      strInstructions,
      strIngredient1,
      strIngredient2,
      strIngredient3,
      strIngredient4,
      strIngredient5,
      strIngredient6,
      strIngredient7,
      strIngredient8,
      strIngredient9,
      strIngredient10,
      strIngredient11,
      strIngredient12,
      strIngredient13,
      strIngredient14,
      strIngredient15,
      strMeasure1,
      strMeasure2,
      strMeasure3,
      strMeasure4,
      strMeasure5,
      strMeasure6,
      strMeasure7,
      strMeasure8,
      strMeasure9,
      strMeasure10,
      strMeasure11,
      strMeasure12,
      strMeasure13,
    } = req.body;
    const newCocktail = { ...req.body, owner: req.user._id };
    Cocktails.create(newCocktail)
      .then((result) => {
        res.redirect("/myaccount/mycocktails");
      })
      .catch((err) => res.render("error"));
  }
);

// GET NEW COCKTAIL FORM
router.get(
  "/myaccount/new-cocktail",
  ensureLogin.ensureLoggedIn(),
  (req, res) => {
    res.render("auth/MyAccount/newCocktailForm", { user: req.user });
  }
);

// GET MYCOCKTAILS INFO
router.get(
  "/myaccount/mycocktails/details/:id",
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const id = req.params.id;
    Cocktails.findById(id)
      .then((result) => {
        res.render("auth/MyAccount/details", {
          cocktail: result,
          user: req.user,
        });
      })

      .catch((err) => {
        console.log(err);
        res.render("error");
      });
  }
);

// GET EDIT COCKTAIL FORM
router.get(
  "/myaccount/mycocktails/details/:id/edit",
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const id = req.params.id;
    Cocktails.findById(id)
      .then((result) => {
        console.log(res)
        res.render("auth/MyAccount/editCocktailForm", {
          cocktail: result,
          user: req.user,
        });
      })
      .catch((err) => {
        console.log(err);
        res.render("error");
      });
  }
);

//POST EDIT COCKTAIL FORM
router.post(
  "/myaccount/mycocktails/details/:id/edit",
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const id = req.params.id;
    const editedCocktail = req.body;
    Cocktails.findByIdAndUpdate(id, editedCocktail)
      .then(() => {
        res.redirect("/myaccount/mycocktails");
      })
      .catch((err) => {
        console.log(err);
        res.render("error");
      });
  }
);

// POST DELETE COCKTAIL
router.post(
  "/myaccount/mycocktails/details/:id/delete",
  ensureLogin.ensureLoggedIn(),
  (req, res, next) => {
    const id = req.params.id;
    Cocktails.findByIdAndRemove(id)
      .then(() => {
        res.redirect("/myaccount/mycocktails");
      })
      .catch((err) => {
        console.log(err);
        res.render("error");
      });
  }
);


module.exports = router;
