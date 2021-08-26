//Env
const userPersistencia = process.env.PERSISTENCIA_USUARIO;

//Persistencias


class Factory {
  async obtenerPersistencia() {
    //Obtener persistencia
    switch (userPersistencia) {
      case 'MONGODB':
        return await require('./mongodb_usuario');
      default:
        return null;
    }
  }
}

module.exports = Factory;