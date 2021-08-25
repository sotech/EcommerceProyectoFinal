const factoryModule = require('./factoryProductos');
const factory = new factoryModule();
//Singleton
let instancia = null;
class Singleton{
  constructor(){
    this.dao = factory.obtenerPersistencia();
  }
  static getInstancia() {
    if (!instancia) {
      instancia = new Singleton();
    }
    return instancia;
  }
}

module.exports = Singleton;