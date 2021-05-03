const express = require('express');
const routerProductos_fs = express.Router();
const { Producto } = require('../models/producto');
const db_fs = require('../persistencias/db_fs');

const database = new db_fs.DB_FS("databaseProductos");
database.InicializarDB();

routerProductos_fs.get("/productos/:id?",(req,res) => {
    if(req.params.id){
        console.log("Listar por ID");
        database.ListarProducto(req.params.id).then(producto => {
            if (producto) {
                res.status(200).json({ producto: producto });
            } else {
                res.status(400).json({ error: 'Producto no encontrado' });
            }
        });        
    }else{
        console.log("Listar todos los productos");
        database.ListarProductos().then(productos => {
            res.status(200).json({productos:productos});
        });
    }
});

routerProductos_fs.post("/productos/",(req,res) => {
    let productoAGuardar = new Producto(req.body.id, req.body.nombre, req.body.descripcion, req.body.codig, req.body.foto, req.body.precio, req.body.stock);
    let resultado = database.GuardarProducto(productoAGuardar);
    if(resultado){
        res.status(201).json({producto:productoAGuardar});
    }else{
        res.status(500).json({error:"Ocurrio un error - POST productos"});
    }
});

routerProductos_fs.put("/productos/:id",(req,res)=> {
    let productoNuevo = new Producto(req.body.id, req.body.nombre, req.body.descripcion, req.body.codig, req.body.foto, req.body.precio, req.body.stock);
    database.ActualizarProducto(req.params.id,productoNuevo).then(resultado => {
        if (resultado) {
            if (resultado > 0) {
                res.status(200).json({ producto: productoNuevo });
            } else {
                res.status(400).json({ error: "Producto no encontrado" });
            }
        } else {
            res.status(500).json({ error: "Ocurrio un error en POST - productos" });
        }
    });
});

routerProductos_fs.delete("/productos/:id",(req,res)=>{
    database.BorrarProducto(req.params.id).then(resultado => {
        if (resultado) {
            if (resultado > 0) {
                res.status(200).json({ aviso: "Producto borrado" });
            } else {
                res.status(400).json({ error: "Producto no encontrado" });
            }
        } else {
            res.status(500).json({ error: "Ocurrio un error en DELETE - productos" });
        }
    })    
});

module.exports = routerProductos_fs;