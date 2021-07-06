const mongoose = require('mongoose');
const producto = require('./productoSchema');

const carritoSchema = new mongoose.Schema({
  timestamp: {
    type:String,
    default:Date.now()
  },
  productos:[{type:mongoose.Schema.Types.ObjectId,ref:'Producto'}]
})

module.exports = carritoSchema;