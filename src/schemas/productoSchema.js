const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  timestamp:{
    type:String,
    default:Date.now()
  },
  nombre:String,
  descripcion:String,
  codigo:String,
  foto:String,
  precio:Number,
  stock:Number
})

module.exports = productoSchema;