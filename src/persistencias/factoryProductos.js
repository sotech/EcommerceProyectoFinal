//Env
const persistencia = process.env.PERSISTENCIA;

class Factory{
  async obtenerPersistencia(){
    //Obtener persistencia
    switch (persistencia){
      case 'MONGODB':
        return await require('./mongodb_productos');
      default:
        return null;
    }
  }
}

module.exports = Factory;