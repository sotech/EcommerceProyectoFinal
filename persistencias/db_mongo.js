const model = require('../config/mongoProductoModel.js');
const mongoose = require('mongoose');
const URL = "mongodb://localhost:27017/ecommerce";

class DB_MongoLocal {
    constructor(){
        (async () => {
            try {
                console.log("Conectando a Mongo");
                let respueta = await mongoose.connect(URL, {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                })
                console.log("Base de datos mongo conectada");
            }
            catch (e) {
                console.log("Error: " + e);
            }
        })();
    }

    

    //CRUD
    async ListarProducto(id) {
        try{
            let productos = await model.productos.find({"id" : id});
            if(productos.length > 0){
                return productos[0];
            }
        }catch(e){
            console.error("Ocurrio un error al buscar el producto por id: " + e);
        }
    }

    async ListarProductos() {
        try {
            let productos = await model.productos.find({});
            return productos;
        } catch (e) {
            console.error("Ocurrio un error al buscar los productos: " + e);
        }
    }

    async GuardarProducto(producto) {
        try {
            const productoSaveModel = new model.productos(producto);
            let productoSave = await productoSaveModel.save();
            return productoSave;
        } catch (e) {
            console.error("Ocurrio un error al guardar el producto: " + e);
        }
    }

    async ModificarProducto(id, producto) {
        try{
            let respuesta = await model.productos.updateOne({"id":id},{$set:{"timestamp": Date.now(), "nombre": producto.nombre, "descripcion" : producto.descripcion, "codigo":producto.codigo, "foto" : producto.foto, "precio":producto.precio, "stock": producto.stock}});
            return respuesta.nModified;
        }catch(e){
            console.error("Ocurrio un error al actualizar el producto: " + e);
        }
    }


    async BorrarProducto(id) {
        try{
            let respuesta = await model.productos.deleteOne({"id": id});
            return respuesta.deletedCount;
        }catch(e){
            console.error("Ocurrio un error al borrar el producto: " + e);
        }
    }
}

module.exports = { DB_MongoLocal };