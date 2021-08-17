const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./src/dbs/productos.sqlite"
  },
  useNullAsDefault: true
});

class SqliteProductosPersistencia {
  constructor() {
    this.knex = knex;
    this.knex.schema.hasTable('productos').then((exists) => {
      if (!exists) {
        knex.schema.createTable('productos', (table) => {
          table.increments('id');
          table.string('nombre');
          table.string('descripcion');
          table.string('codigo');
          table.string('foto');
          table.integer('precio');
          table.integer('stock'); 
          table.string('timestamp');
        })
          .then(() => { console.log("Tabla Productos creada") })
          .catch((err) => { console.log("Error: " + err) })
      } else {
        console.log("Tabla Productos ya existente");
      }
    })
      .catch((err) => { console.log("Error: " + err) })
  }


  guardarProducto = async (producto) => {
    const resultado = await this.knex('productos').insert(producto);
    return resultado;
  }

  listarProducto = async (id) => {
    const resultado = await this.knex.from('productos').select("*").where('id', '=', id);
    if(resultado.length > 0){
      return resultado[0];
    }else{
      return null;
    }
  }

  listarProductos = async () => {
    const resultado = await this.knex.from('productos').select("*");
    return resultado;
  }

  actualizarProducto = async (id, producto) => {
    producto.timestamp = new Date();
    const resultado = await this.knex.from('productos').where('id', id).update(producto)
    return resultado;
  }

  borrarProducto = async (id) => {
    const resultado = await this.knex('productos').where('id', "=", id).del()
    return resultado;
  }

}

module.exports = SqliteProductosPersistencia;