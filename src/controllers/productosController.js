const Producto = require('../models/productoModel');

module.exports = {
  listarProducto: (req, res) => {
    const { id } = req.params;
    if (id) {
      Producto.findById(id, (err, producto) => {
        if (err) {
          res.status(400).json({ error: 'Ocurrio un error al buscar el producto', err: err });
        } else {
          if (producto) {
            res.status(200).json({ producto: producto });
          } else {
            res.status(404).json({ error: 'Producto no encontrado.' });
          }
        }
      })
    } else {
      //Listar los productos
      Producto.find({}, (err, productos) => {
        if (err) {
          res.status(400).json({ error: 'Ocurrio un error al buscar los productos', err: err });
        } else {
          res.status(200).json({ productos: productos });
        }
      })
    }
  },

  agregarProducto: (req, res) => {
    const { _id, nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const producto = new Producto({
      _id: _id,
      nombre: nombre,
      timestamp: Date.now(),
      descripcion: descripcion,
      codigo: codigo,
      foto: foto,
      precio: precio,
      stock: stock
    });
    producto.save((err, producto) => {
      if (err) {
        res.status(400).json({ error: 'Ocurrio un error al guardar el producto', err: err });
      } else {
        res.status(201).json({ status: 'OK', producto: producto });
      }
    })
  },

  actualizarProducto: (req, res) => {
    const { id } = req.params;
    const {nombre,descripcion,codigo,foto,precio,stock} = req.body;
    Producto.findByIdAndUpdate(id,
      {
        nombre:nombre,
        timestamp:Date.now(),
        descripcion:descripcion,
        codigo:codigo,
        foto:foto,
        precio:precio,
        stock:stock
      },{new:true},(err,productoNuevo) => {
        if(err){
          res.status(400).json({ error: 'Ocurrio un error al actualizar el producto', err: err});
        }else{
          if(productoNuevo){
            res.status(200).json({ producto: productoNuevo });
          }else{
            res.status(404).json({ error: 'Producto no encontrado' });
          }
        }
      })
  },

  borrarProducto: (req, res) => {
    const { id } = req.params;
    Producto.findByIdAndRemove(id,(err,productoRemovido) => {
      if(err){
        res.status(400).json({ error: 'Ocurrio un error al borrar el producto', err: err });
      } else {
        if (productoRemovido) {
          res.status(200).json({ productoRemovido: productoRemovido });
        } else {
          res.status(404).json({ error: 'Producto no encontrado' });
        }
      }
    })
  }
}