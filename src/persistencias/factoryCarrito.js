//Env
const carritoPersistencia = process.env.PERSISTENCIA_CARRITO;

//Persistencias
const mongodb_carrito = require('./mongodb_carrito');

class Factory {
  obtenerPersistencia() {
    //Obtener persistencia
    switch (carritoPersistencia) {
      case 'MONGODB':
        return mongodb_carrito;
        break;
    }
  }
}

module.exports = Factory;