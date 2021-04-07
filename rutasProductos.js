const express = require('express');
const routerProductos = express.Router();
const { Producto } = require('./producto');
const { Database } = require('./databasetext');

let productosDB = new Database(__dirname + "/productosDB.txt");
let productos = [];

routerProductos.get('/listar/:id?', (req, res) => {
    if (req.params.id) {
        productosDB.leer().then((contenido) => {
            if (contenido) {
                productos = contenido;
                let resultado = productos.filter(x => x.id == req.params.id);
                if (resultado.length > 0) {
                    res.status(200).json(resultado[0]);
                } else {
                    res.status(400).json({ error: `Producto con id ${req.params.id} no encontrado` });
                }
            }
        });
    } else {
        productosDB.leer().then((productos) => {
            if (productos) {
                res.status(200).json(productos);
            } else {
                res.status(400).json({ error: "No hay productos cargados" });
            }
        });
    }
});

routerProductos.post('/agregar', (req, res) => {
    if (esAdministrador) {
        productosDB.leer().then((_productos) => {
            if (_productos) {
                productos = _productos;
            }
            let newId = productos.length + 1;
            let productoNuevo = new Producto(newId, req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock);
            productos.push(productoNuevo);
            productosDB.guardar(productos);
            res.status(200).json(productoNuevo);
        })
    }
    else {
        res.status(401).send({ error: -1, descripcion: `ruta '${req.originalUrl}' método ${req.method} no autorizada` });
    }
});

routerProductos.put('/actualizar/:id', (req, res) => {
    if (esAdministrador) {
        //Cargar productos
        productosDB.leer().then((_productos) => {
            if (_productos) {
                productos = _productos;
            }
            //Eliminar y reemplazar el producto
            let indexProducto = productos.findIndex(producto => producto.id == req.params.id);
            if (indexProducto >= 0) {
                let nuevoProducto = new Producto(productos[indexProducto].id, req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock);
                productos.splice(indexProducto, 1, nuevoProducto);
                productosDB.guardar(productos);
                res.status(200).json(nuevoProducto);
            }
        })
    }
    else {
        res.status(401).json({ error: -1, descripcion: `ruta '${req.originalUrl}' método ${req.method} no autorizada` });
    }
});

routerProductos.delete('/borrar/:id', (req, res) => {
    if (esAdministrador) {
        productosDB.leer().then((contenido) => {
            if (contenido) {
                productos = contenido;
            }
            //Buscar y borrar el elemento
            let indexProducto = productos.findIndex(producto => producto.id == req.params.id);
            let productosBorrados = []
            if (indexProducto >= 0) {
                productosBorrados = productos.splice(indexProducto, 1);
            }
            productosDB.guardar(productos);
            res.status(200).json(productosBorrados);
        })
    } else {
        res.status(401).json({ error: -1, descripcion: `ruta '${req.originalUrl}' método ${req.method} no autorizada` });
    }
});

module.exports = routerProductos;