const { config } = require('../config/sqlite3CarritoConfig');
const knex = require('knex')(config);
const { Carrito } = require('../models/carrito');
class DBCarrito_SQL {

    constructor() {
        knex.schema.hasTable('carrito').then((exists) => {
            if (!exists) {
                knex.schema.createTable('carrito', (table) => {
                    table.increments('id');
                    table.string('timestamp');
                    table.string('productos')
                })
                    .then(() => { console.log("Tabla SQLite carrito creada") })
                    .catch((err) => { console.log("Error: " + err) })
                    .finally(() => {
                        knex.destroy();
                    })
            } else {
                console.log("Tabla SQLite carrito ya creada");
            }
        })
            .catch((err) => console.log("Error al buscar la tabla: " + err))
    }

    async GetProductoPorId(id) {
        let productos = await knex.from('productos').select("*").where('id', "=", id)
        if (productos.length > 0) {
            let producto = JSON.parse(JSON.stringify(productos[0]))
            return producto;
        } else {
            return null;
        }
    }

    async GetProductos(listaIds) {
        let productos = [];
        for (let index = 0; index < listaIds.length; index++) {
            let producto = await this.GetProductoPorId(listaIds[index]);
            productos.push(producto);
        }
        return productos;
    }

    async CrearCarrito(id) {
        //Crear nuevo carrito
        let carrito = new Carrito(id);
        carrito.productos = JSON.stringify(carrito.productos);
        let carritoDB = await knex('carrito').select("*").insert(carrito)
        console.log("Carrito creado");
    }

    //CRUD
    async ListarProductoDelCarrito(carritoId, productoId) {
        let carrito = await knex.from('carrito').select("*").where("carrito.id", "=", carritoId)
        carrito = JSON.parse(JSON.stringify(carrito[0]));
        carrito.productos = JSON.parse(carrito.productos);
        if (carrito.productos.includes(productoId)) {
            let producto = await this.GetProductoPorId(productoId);
            if (producto) {
                return producto;
            }
        }
        return null;
    }

    async ListarProductosDelCarrito(carritoId) {
        let carrito = await knex.from('carrito').select("*").where("carrito.id", "=", carritoId)
        carrito = JSON.parse(JSON.stringify(carrito[0]));
        carrito.productos = JSON.parse(carrito.productos);
        let productos = await this.GetProductos(carrito.productos)
        return productos;
    }

    async GuardarProducto(carritoId, productoId) {
        let carrito = await knex.from('carrito').where("carrito.id", "=", carritoId)
        carrito = JSON.parse(JSON.stringify(carrito[0]));
        carrito.productos = JSON.parse(carrito.productos);
        //Verificar si es que el id existe dentro de los productos
        let productos = await knex('productos').select("id").where("id", "=", productoId);
        productos = JSON.parse(JSON.stringify(productos));
        if (productos.length > 0) {
            carrito.productos.push(productoId);
            let respuesta = await knex('carrito').select("*").where("carrito.id", "=", carritoId).update({ productos: JSON.stringify(carrito.productos) })
            return respuesta;
        } else {
            return -1;
        }
    }

    async BorrarProductoDelCarrito(carritoId, productoId) {
        let carrito = await knex.from('carrito').where("carrito.id", "=", carritoId)
        carrito = JSON.parse(JSON.stringify(carrito[0]));
        carrito.productos = JSON.parse(carrito.productos);
        let indexBuscado = carrito.productos.indexOf(productoId.toString());
        if (indexBuscado >= 0) {
            carrito.productos.splice(indexBuscado, 1);
            let respuesta = await knex('carrito').select("*").where("carrito.id", "=", carritoId).update({ productos: JSON.stringify(carrito.productos) })
            return 1;
        } else {
            return -1;
        }

    }
}

module.exports = { DBCarrito_SQL };
