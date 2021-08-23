const router = require("express").Router();
const passport = require('passport');
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

router.get("/", (req,res) => {
  res.render('index');
});

router.get('/home', isLoggedIn, (req, res) => {
  res.render('home');
})

router.get("/productos", (req, res) => {
  res.render('productos');
});

router.get("/carrito", (req, res) => {
  res.render('carrito');
});

router.get('/login', (req, res) => {
  res.render('login');
})

router.get('/signup', (req, res) => {
  res.render('signup');
})

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/home',
  failureRedirect: '/fail'
}));

router.post('/login', passport.authenticate('login', {
  successRedirect: '/home',
  failureRedirect: '/fail'
}));

module.exports = router;