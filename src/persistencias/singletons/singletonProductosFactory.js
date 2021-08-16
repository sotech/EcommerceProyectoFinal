let instancia = null;
const FactoryProductos = require('../factories/factoryProductos');

const factory = new FactoryProductos();

class SingletonProductosFactory {
  constructor() {
    this.baseDatos = factory.obtenerPersistencia();
  }

  static getInstance() {
    if (!instancia) {
      instancia = new SingletonProductosFactory();
    }

    return instancia;
  }
}

module.exports = SingletonProductosFactory;