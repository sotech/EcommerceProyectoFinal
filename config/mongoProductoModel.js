const mongoose = require('mongoose');

const productosCollectionName = 'productos';

const ProductosSchema = new mongoose.Schema({
    id: { type: Number, require: true },
    timestamp: { type: String, require: true },
    nombre: { type: String, require: true },
    descripcion: { type: String, require: true },
    codigo: { type: Number, require: true },
    foto: { type: String, require: true },
    precio: { type: Number, require: true },
    stock: { type: Number, require: true }
});

const productos = mongoose.model(productosCollectionName, ProductosSchema)

exports.productos = productos;