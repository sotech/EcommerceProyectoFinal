const Singleton = require('../persistencias/singletons/singletonUsuariosFactory');
const bcrypt = require('bcrypt-nodejs');
const DBUsuarios = Singleton.getInstance().baseDatos;

module.exports = {
  async obtenerUsuario(email){
    return await DBUsuarios.obtenerUsuarioPorEmail(email);
  },

  async obtenerUsuarioPorId(Id) {
    return await DBUsuarios.obtenerUsuarioPorId(Id);
  },
  
  encriptarContrasena(password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  },

  compararContrasenas(password, otherPassword){
    return bcrypt.compareSync(password, otherPassword);
  },

  async crearUsuario(datos){
    return DBUsuarios.guardarUsuario(datos);
  }
}
