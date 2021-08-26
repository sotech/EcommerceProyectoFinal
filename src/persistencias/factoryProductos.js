//Env
const productosPersistencia = process.env.PERSISTENCIA_PRODUCTOS;

class Factory{
  async obtenerPersistencia(){
    //Obtener persistencia
    switch(productosPersistencia){
      case 'MONGODB':
        return await require('./mongodb_productos');
      default:
        return null;
    }
  }
}

module.exports = Factory;