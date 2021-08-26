//Env
const carritoPersistencia = process.env.PERSISTENCIA_CARRITO;

//Persistencias


class Factory {
  async obtenerPersistencia() {
    //Obtener persistencia
    switch (carritoPersistencia) {
      case 'MONGODB':
        return await require('./mongodb_carrito');
      default:
        return null;
    }
  }
}

module.exports = Factory;