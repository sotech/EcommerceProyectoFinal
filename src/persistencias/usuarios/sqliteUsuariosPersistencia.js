const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: "./src/dbs/usuarios.sqlite"
  },
  useNullAsDefault: true
});

class SqliteUsuariosPersistencia {
  constructor() {
    this.knex = knex;
    this.knex.schema.hasTable('usuarios').then((exists) => {
      if (!exists) {
        knex.schema.createTable('usuarios', (table) => {
          table.increments('id');
          table.string('email');
          table.string('password');
          table.string('nombre');
          table.string('telefono');
        })
          .then(() => { console.log("Tabla Usuarios creada") })
          .catch((err) => { console.log("Error: " + err) })
      } else {
        console.log("Tabla Usuarios ya existente");
      }
    })
      .catch((err) => { console.log("Error: " + err) })
  }

  guardarUsuario = async (usuario) => {
    const resultado = await this.knex('usuarios').insert(usuario);
    return resultado;
  }

  obtenerUsuarioPorEmail = async (email) => {
    const resultado = await this.knex.from('usuarios').select("*").where('email', '=', email);
    if(resultado.length > 0){
      return resultado[0];
    }else{
      return null;
    }
  }

  obtenerUsuarioPorId = async (id) => {
    const resultado = await this.knex.from('usuarios').select("*").where('id', '=', id);
    if (resultado.length > 0) {
      return resultado[0];
    } else {
      return null;
    }
  }
  
  borrarUsuarioPorEmail = async (email) => {
    const resultado = await this.knex('usuarios').where('email', "=", email).del()
    return resultado;
  }

}

module.exports = SqliteUsuariosPersistencia;