//Env
const productosPersistencia = process.env.PERSISTENCIA_PRODUCTOS;

//Persistencias
const mongodb_productos = require('./mongodb_productos');

class Factory{
  obtenerPersistencia(){
    //Obtener persistencia
    switch(productosPersistencia){
      case 'MONGODB':
        return mongodb_productos;
        break;
    }
  }
}

module.exports = Factory;