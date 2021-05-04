const express = require('express');
const routerCarrito_fs = express.Router();
const dbcarrito_fs = require('../persistencias/dbcarrito_fs.js');
const {Producto} = require('../models/producto');

const database = new dbcarrito_fs.DBCarrito_FS("databaseCarrito");
database.InicializarDB(1); //Hard coded - Id del carrito

routerCarrito_fs.get("/carrito/:id?", (req, res) => {
    if (req.params.id) {
        console.log("Listar producto del carrito por ID");
        database.ListarProductoDeCarrito(req.params.id).then(producto => {
            if (producto) {
                res.status(200).json({ producto: producto });
            } else {
                res.status(400).json({ error: 'Producto no encontrado' });
            }
        });
    } else {
        console.log("Listar todos los productos del carrito");
        database.ListarProductosDelCarrito().then(productos => {
            res.status(200).json({ productos: productos });
        });
    }
});

routerCarrito_fs.post("/carrito/", (req, res) => {
    let productoAGuardar = new Producto(req.body.id, req.body.nombre, req.body.descripcion, req.body.codig, req.body.foto, req.body.precio, req.body.stock);
    let resultado = database.GuardarProducto(productoAGuardar);
    if (resultado) {
        res.status(201).json({ producto: productoAGuardar });
    } else {
        res.status(500).json({ error: "Ocurrio un error - POST carrito" });
    }
});

routerCarrito_fs.delete("/carrito/:id", (req, res) => {
    database.BorrarProductoDelCarrito(req.params.id).then(resultado => {
        if (resultado) {
            if (resultado > 0) {
                res.status(200).json({ aviso: "Producto borrado" });
            } else {
                res.status(400).json({ error: "Producto no encontrado" });
            }
        } else {
            res.status(500).json({ error: "Ocurrio un error en DELETE - carrito" });
        }
    })
});

module.exports = routerCarrito_fs;