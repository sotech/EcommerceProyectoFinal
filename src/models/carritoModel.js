const mongoose = require('mongoose');
const carritoSchema = require('../schemas/carritoSchema');

const Carrito = mongoose.model('Carrito', carritoSchema);

module.exports = Carrito;