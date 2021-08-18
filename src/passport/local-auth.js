const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const warnings = require('log4js').getLogger('warnings');

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  //Buscar si ya existe el usuario
  const user = await userAPI.obtenerUsuario(email);
  if (user) {
    warnings.warn('Usuario ya existente');
    return done(null, false);
  } else {
    //Crear usuario
    const {nombre,telefono} = req.body;
    const newUser = {
      email,
      password : userAPI.encriptarContrasena(password),
      nombre,
      telefono
    }
    const usuario = await userAPI.crearUsuario(newUser);
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
    return done(null, false);
  }
  if (!userAPI.compararContrasenas(password,user.password)) {
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