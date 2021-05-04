const fs = require('fs');
const path = require('path');
const { Carrito } = require('../models/carrito');

class DBCarrito_FS {
    constructor(nombreDB) {
        this.fileLocation = path.join(__dirname, "..", "/dbs/", nombreDB + ".txt");
    }

    async InicializarDB(id) {
        //Crear por primera vez si es que no existe
        try {
            await fs.promises.readFile(this.fileLocation);
        } catch (e) {
            console.error("Error al leer el archivo carrito por primera vez: " + e);
            let carrito = new Carrito(id);
            try {
                console.log("Creando archivo carrito");
                await fs.promises.writeFile(this.fileLocation, JSON.stringify(carrito));
            } catch (e) {
                console.error("Error al crear el archivo carrito por primera vez: " + e);
            }
        }
    }

    GetIndexProductoPorId(lista, id) {
        for (let index = 0; index < lista.length; index++) {
            if (lista[index].id == id) {
                return index;
            }
        }
        return -1;
    }

    async ListarProductoDeCarrito(id) {
        try {
            let carrito = await fs.promises.readFile(this.fileLocation);
            carrito = JSON.parse(carrito);
            let indexBuscado = this.GetIndexProductoPorId(carrito.productos, id);
            if (indexBuscado >= 0) {
                return carrito.productos[indexBuscado];
            } else {
                return null;
            }
        } catch (e) {
            console.error("Ocurrio un error al listar el producto por id: " + e);
        }
    }

    async ListarProductosDelCarrito() {
        try {
            let carrito = await fs.promises.readFile(this.fileLocation);
            carrito = JSON.parse(carrito);
            return carrito.productos;
        } catch (e) {
            console.error("Ocurrio un error al listar los productos: " + e);
        }
    }

    async GuardarProducto(producto) {
        try {
            let carrito = await fs.promises.readFile(this.fileLocation);
            carrito = JSON.parse(carrito);
            carrito.productos.push(producto);
            try {
                await fs.promises.writeFile(this.fileLocation, JSON.stringify(carrito));
                return producto;
            } catch (e) {
                console.error("Ocurrio un error al guardar la nueva lista de productos del carrito: " + e);
            }
        } catch (e) {
            console.error("Ocurrio un error al guardar el producto en el carrito: " + e);
        }
    }

    async BorrarProductoDelCarrito(id) {
        try {
            let carrito = await fs.promises.readFile(this.fileLocation);
            carrito = JSON.parse(carrito);
            let indexProductoBuscado = this.GetIndexProductoPorId(carrito.productos, id);
            if (indexProductoBuscado >= 0) {
                carrito.productos.splice(indexProductoBuscado, 1);
                try {
                    await fs.promises.writeFile(this.fileLocation, JSON.stringify(carrito));
                    return 1;
                } catch (e) {
                    console.error("Ocurrio un error al guardar el carrito sin el producto removido: " + e);
                    return null;
                }
            } else {
                return 0;
            }
        } catch (e) {
            console.error("Ocurrio un error al borrar el producto del carrito por id: " + e);
        }
    }
}

module.exports = { DBCarrito_FS };