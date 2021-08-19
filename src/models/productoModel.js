const mongoose = require("mongoose");
const productoSchema = mongoose.Schema({
  timestamp: String,
  nombre:String,
  descripcion:String,
  codigo:String,
  precio: Number,
  fotoUrl: String,
  stock:Number
});
const Producto = mongoose.model("Producto", productoSchema);
module.exports = Producto;