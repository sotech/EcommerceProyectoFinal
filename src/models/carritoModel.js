const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  itemId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Producto'
  },
  cantidad:{
    type:Number,
    default:1
  }
})
const carritoSchema = mongoose.Schema({
  timestamp: String,
  items: [itemSchema]
});
const Carrito = mongoose.model("Carrito", carritoSchema);
module.exports = Carrito;