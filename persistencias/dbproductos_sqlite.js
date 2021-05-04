const {config} = require('../config/sqlite3ProductoConfig');
const knex = require('knex')(config);

class DBProductos_SQL {

    constructor(){
        knex.schema.hasTable('productos').then((exists) => {
            if (!exists) {
                knex.schema.createTable('productos', (table) => {
                    table.increments('id');
                    table.string('timestamp');
                    table.string('nombre');
                    table.string('descripcion');
                    table.integer('codigo');
                    table.string('foto');
                    table.float('precio');
                    table.integer('stock');
                })
                    .then(() => { console.log("Tabla productos creada") })
                    .catch((err) => { console.log("Error: " + err) })
                    .finally(() => {
                        knex.destroy();
                    })
            }else{
                console.log("Tabla SQLite productos ya creada");
            }
        })
            .catch((err) => console.log("Error al buscar la tabla: " + err))
    }
    //CRUD
    ListarProducto(id) {
        return new Promise((res,rej) => {
            knex.from('productos').select("*").where('id', "=", id)
                .then((productos) => {
                    if (productos.length > 0) {
                        res(productos[0]);
                    }
                })
                .catch((err) => console.error("Ocurrio un error al buscar los productos por id: " + err))
        })
        
    }

    ListarProductos() {
        return new Promise((res,rej) => {
            knex.from('productos').select("*")
                .then((productos) => res(productos))
                .catch((err) => console.error("Ocurrio un error al buscar los productos por id: " + err))
        })            
    }

    GuardarProducto(producto) {
        return new Promise((res, rej) => {
            knex('productos').insert(producto)
                .then(resultado => res(resultado))
                .catch((err) => console.error("Ocurrio un error al guardar el producto: " + err))
        })
    }

    ActualizarProducto(id, producto) {
        return new Promise((res,rej) => {
            knex.from('productos').where('id', id).update({ timestamp: Date.now(), nombre: producto.nombre, descripcion: producto.descripcion, codigo: producto.codigo, foto: producto.foto, precio: producto.precio, stock: producto.stock })
                .then((resultado) => {
                    if (resultado == 1) {
                        console.log("Actualizacion exitosa");                        
                    }else{
                        console.log("No se encontro el producto a actualizar");
                    }
                    res(resultado);
                })
                .catch(err => {
                    console.error("Ocurrio un error al actualizar el producto: " + err)
                })
        })      
    }


    BorrarProducto(id) {
        return new Promise((res,rej) => {
            knex('productos').where('id', "=", id).del()
                .then((eliminado) => {
                    if (eliminado == 1) {
                        console.log("Producto borrado");
                    } else {
                        console.log("No se encontro el procuto a borrar");
                    }
                    res(eliminado);
                })
                .catch(err => console.error("Ocurrio un error al eliminar el producto: " + err))
        })
    }
}

module.exports = { DBProductos_SQL };