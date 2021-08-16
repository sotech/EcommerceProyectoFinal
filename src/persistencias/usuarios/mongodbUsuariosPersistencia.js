const User = require('../../models/userModel');

class MongoDBUsuariosPersistencia {
  constructor() {
    require('../../utils/mongoConnection');
  }
  guardarUsuario = async (usuario) => {
    const usuarioCreado = new User(usuario);
    const resultado = await usuarioCreado.save()
    return resultado;
  }

  obtenerUsuarioPorEmail = async (email) => {
    const resultado = await User.findOne({ 'email': email});
    return resultado;
  }

  obtenerUsuarioPorId = async (id) => {
    const resultado = await User.findById(id);
    return resultado;
  }

  borrarUsuarioPorEmail = async (email) => {
    const resultado = await User.deleteOne({'email':email});
    return resultado;
  }
}

module.exports = MongoDBUsuariosPersistencia;