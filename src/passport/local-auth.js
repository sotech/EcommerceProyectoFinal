const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');
const Carrito = require('../models/carritoModel');
const mailer = require('../utils/gmailer');
const warnings = require('log4js').getLogger('warnings');

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({ 'email': email })
  if (user) {
    warnings.warn('Usuario ya existente');
    return done(null, false);
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    newUser.nombre = req.body.nombre;
    newUser.edad = req.body.edad;
    newUser.telefono = req.body.telefono;
    newUser.fotoURL = req.body.fotoURL;
    newUser.esAdmin = req.body.esAdmin || false;
    const newCarrito = new Carrito();
    const savedCarrito = await newCarrito.save();
    newUser.carrito = savedCarrito;
    await newUser.save()
    mailer.newUserMail();
    done(null, newUser);
  }
}));

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    return done(null, false);
  }
  if (!user.comparePassword(password)) {
    warnings.warn('Contraseña incorrecta')
    return done(null, false);
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});