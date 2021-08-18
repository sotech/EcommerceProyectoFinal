const mongoose = require("mongoose");
const productoSchema = mongoose.Schema({
  descripcion: {
    type: String,
    required: [true, "Falta un nombre"],
  },
  precio: {
    type: String,
    required: [true, "Falta un precio"],
  },
  fotoUrl: {
    type: String,
    required: true,
  },
  categoria: {
    type: String,
    required: true,
  },
});
const Producto = mongoose.model("Producto", productoSchema);
module.exports = Producto;