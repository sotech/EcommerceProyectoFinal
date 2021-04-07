const express = require('express');
const routerCarrito = express.Router();
const { Carrito } = require('./carrito');
const { Database } = require('./databasetext');

let carritoDB = new Database(__dirname + "/carritoDB.txt");
let carrito = new Carrito(Math.floor(Math.random() * 100));

routerCarrito.get('/listar/:id?', (req, res) => {
    if (req.params.id) {
        carritoDB.leer().then(carrito => {
            if (carrito) {
                //Buscar producto del carrito
                let productoArray = carrito.productos.filter(p => p.id == req.params.id);
                if (productoArray.length > 0) {
                    res.status(200).json(productoArray[0]);
                } else {
                    res.status(400).json({ error: "No se encontro el producto del carrito con id: " + req.params.id });
                }
            } else {
                res.status(400).json({ error: "No se encontro el producto del carrito con id: " + req.params.id });
            }
        })
    } else {
        carritoDB.leer().then((contenido) => {
            if (contenido) {
                carrito.inicializarProductos(contenido.productos);
                let productosDelCarrito = carrito.obtenerProductos();
                res.status(200).json(productosDelCarrito);
            }
            else {
                res.status(400).json({ error: 'Carrito vacio' });
            }
        });
    }
});

routerCarrito.post('/agregar/:id_producto', (req, res) => {
    //Cargar productos
    productosDB.leer().then(contenido => {
        if (contenido) {
            productos = contenido;
            //Buscar producto con id;
            let productoBuscadoArray = productos.filter(p => p.id == req.params.id_producto);
            if (productoBuscadoArray.length > 0) {
                let productoBuscado = productoBuscadoArray[0];
                //Producto encontrado, agregar al carrito
                carrito.agregarProducto(productoBuscado);
                //Guardar carrito
                carritoDB.guardar(carrito).then(() => {
                    res.status(200).json(productoBuscado);
                })
            } else {
                res.status(400).json({ error: "No se encontro el producto con id: " + req.params.id_producto });
            }
        }
    })
});

routerCarrito.delete('/borrar/:id', (req, res) => {
    let productosBorrados = carrito.borrarProducto(req.params.id);
    carritoDB.guardar(carrito).then(() => {
        res.status(200).json(productosBorrados);
    })
});

module.exports = routerCarrito;