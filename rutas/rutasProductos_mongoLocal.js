const express = require('express');
const routerProductos_mongoLocal = express.Router();
const { Producto } = require('../models/producto');
const db_mongoLocal = require('../persistencias/db_mongo');

const database = new db_mongoLocal.DB_MongoLocal();

routerProductos_mongoLocal.get("/productos/:id?", async (req, res) => {
    if (req.params.id) {
        console.log("GET - ID");
        let producto = await database.ListarProducto(req.params.id)
        if (producto) {
            res.status(200).json({ producto: producto });
        } else {
            res.status(400).json({ error: "Producto no encontrado" });
        }
    } else {
        console.log("GET - All");
        let productos = await database.ListarProductos();
        if (productos) {
            res.status(200).json({ productos: productos });
        } else {
            res.status(200).json({ aviso: "No hay productos cargados" });
        }
    }
});

routerProductos_mongoLocal.post("/productos/", async (req, res) => {
    console.log("POST");
    let productoAGuardar = new Producto(req.body.id, req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock);
    let resultado = await database.GuardarProducto(productoAGuardar)
    if (resultado) {
        res.status(201).json({ producto: productoAGuardar })
    } else {
        res.status(400).json({ error: "No se pudo guardar el producto" })
    }
});

routerProductos_mongoLocal.put("/productos/:id", async (req, res) => {
    console.log("PUT");
    let productoNuevo = new Producto(req.body.id, req.body.nombre, req.body.descripcion, req.body.codig, req.body.foto, req.body.precio, req.body.stock);
    let resultado = await database.ModificarProducto(req.params.id, productoNuevo)
    console.log(resultado);
    if (resultado >= 0) {
        if (resultado == 1) {
            res.status(200).json({ producto: productoNuevo })
        } else {
            res.status(400).json({ aviso: "Producto no encontrado" })
        }
    } else {
        res.status(500).json({ error: "No se pudo actualizar el producto" })
    }
});

routerProductos_mongoLocal.delete("/productos/:id", async (req, res) => {
    console.log("DELETE");
    let resultado = await database.BorrarProducto(req.params.id);
    if (resultado >= 0) {
        if (resultado == 1) {
            res.status(200).json({ aviso: "Producto eliminado" });
        } else {
            res.status(400).json({ error: "Producto no encontrado" });
        }
    } else {
        res.status(500).json({ error: "No se pudo actualizar el producto" })
    }
});

module.exports = routerProductos_mongoLocal;