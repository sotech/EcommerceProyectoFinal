const express = require('express');
const routerCarrito_mariadb = express.Router();
const dbcarrito_mariadb = require('../persistencias/dbcarrito_mariadb.js');

const database = new dbcarrito_mariadb.DBCarrito_SQL();

routerCarrito_mariadb.get("/carrito/:id?", async (req, res) => {
    let carritoId = req.query.carritoId;
    if (req.params.id) {
        console.log("Listar producto del carrito por ID");
        let producto = await database.ListarProductoDelCarrito(carritoId, req.params.id)
        if (producto) {
            res.status(200).json({ producto: producto });
        } else {
            res.status(400).json({ error: 'Producto no encontrado' });
        }
    } else {
        console.log("Listar todos los productos del carrito");
        database.ListarProductosDelCarrito(carritoId).then(productos => {
            res.status(200).json({ productos: productos });
        })

    }
});

routerCarrito_mariadb.post("/carrito/nuevoCarrito/:id", (req, res) => {
    let carritoId = req.params.id;
    let resultado = database.CrearCarrito(carritoId);
    if (resultado) {
        res.status(201).json({ aviso: "Carrito creado con id: " + carritoId });
    } else {
        res.status(500).json({ error: "Ocurrio un error - POST carrito" });
    }
});

routerCarrito_mariadb.post("/carrito/:id", async (req, res) => {
    let productoIdAGuardar = req.params.id;
    let carritoId = req.query.id;
    let resultado = await database.GuardarProducto(carritoId, productoIdAGuardar);
    if (resultado >= 0) {
        res.status(201).json({ aviso: "Producto guardado" });
    } else {
        res.status(400).json({ error: "Producto no existente. No se puede agregar al carrito" });
    }
});

routerCarrito_mariadb.delete("/carrito/:id", async(req, res) => {
    let respuesta = await database.BorrarProductoDelCarrito(req.query.carritoId, req.params.id)
    if (respuesta > 0) {
        res.status(200).json({ aviso: "Producto borrado" });
    } else {
        res.status(400).json({ error: "Producto no encontrado" });
    }
});

module.exports = routerCarrito_mariadb;