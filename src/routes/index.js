const router = require('express').Router();
const passport = require('passport');

const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/');
}

router.get('/', (req, res) => {
  if(!req.isAuthenticated()) res.render('index');
  res.redirect('/home');
});

router.get('/login',(req,res)=>{
  res.render('login');
})

router.get('/signup', (req, res) => {
  res.render('signup');
})

router.get('/success',(req,res)=>{
  res.render('success');
})

router.get('/fail', (req, res) => {
  res.render('fail');
})

router.get('/home', isLoggedIn, (req,res) => {
  res.render('home');
})


router.get('/productos', isLoggedIn, (req, res) => {
  res.render('productos',{user:req.user});
})

router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/');
})

router.get('/carrito', (req,res)=>{
  res.render('carrito');
})
router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile',{user:req.user});
})

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/carrito',
  failureRedirect: '/fail'
}));

router.post('/login', passport.authenticate('login',{
  successRedirect:'/carrito',
  failureRedirect:'/fail'
}));

module.exports = router;