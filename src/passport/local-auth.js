const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const warnings = require('log4js').getLogger('warnings');
const userAPI = require('../api/userAPI');
const mailer = require('../utils/gmailer');

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  //Buscar si ya existe el usuario
  const user = await userAPI.obtenerUsuario(email);
  if (user) {
    warnings.warn('Usuario ya existente');
    req.flash('error','Usuario ya existente')
    return done(null, false);
  } else {
    //Crear usuario
    const {nombre,telefono,foto} = req.body;
    const payload = {
      email,
      password : userAPI.encriptarContrasena(password),
      nombre,
      telefono,
      foto
    }
    const usuario = await userAPI.crearUsuario(payload);
    const usuarioCreado = await userAPI.obtenerUsuario(usuario.email);
    mailer.newUserMail();
    done(null, usuarioCreado);
  }
}));

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await userAPI.obtenerUsuario(email);
  if (!user) {
    req.flash('error', 'Usuario no existente')
    return done(null, false);
  }
  if (!userAPI.compararContrasenas(password,user.password)) {
    req.flash('error', 'Contraseña incorrecta')
    warnings.warn('Contraseña incorrecta')
    return done(null, false);
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userAPI.obtenerUsuarioPorId(id);
  done(null, user);
});