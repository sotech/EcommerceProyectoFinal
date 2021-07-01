const Producto = require('../models/productoModel');

module.exports = {
  listarProducto: (req, res) => {
    const { id } = req.params;
    if (id) {
      //1 producto
      Producto.findById(id, (err, producto) => {
        if (err) {
          console.log(`GET - 400 - BAD REQUEST - Error: ${err}`);
          res.status(400).json({ error: 'Ocurrio un error al buscar el producto' });
        } else {
          if (producto) {
            console.log('GET - 200 - OK');
            res.status(200).json({ producto: producto });
          } else {
            console.log('GET - 404 - NOT FOUND');
            res.status(404).json({ error: 'Producto no encontrado.' });
          }
        }
      })
    } else {
      //Listar los productos
      Producto.find({}, (err, productos) => {
        if (err) {
          console.log(`GET - 400 - - BAD REQUEST - Error: ${err}`);
          res.status(400).json({ error: 'Ocurrio un error al buscar los productos' });
        } else {
          console.log('GET - 200 - OK');
          res.status(200).json({ productos: productos });
        }
      })
    }
  },

  agregarProducto: (req, res) => {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const producto = new Producto({
      _id: 1,
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
        console.log(`POST - 400 - BAD REQUEST - Error: ${err}`);
        res.status(400).json({ error: 'Ocurrio un error al guardar el producto' });
      } else {
        console.log(`POST - 201 - OK`);
        res.status(400).json({ status: 'OK', producto: producto });
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
          console.log(`PUT - 400 - BAD REQUEST - Error: ${err}`);
          res.status(400).json({error: 'Ocurrio un error al actualizar el producto'});
        }else{
          if(productoNuevo){
            console.log(`PUT - 200 - OK`);
            res.status(200).json({ producto: productoNuevo });
          }else{
            console.log(`PUT - 404 - NOT FOUND`);
            res.status(404).json({ error: 'Producto no encontrado' });
          }
        }
      })
  },

  borrarProducto: (req, res) => {
    const { id } = req.params;
    Producto.findByIdAndRemove(id,(err,productoRemovido) => {
      if(err){
        console.log(`DELETE - 400 - BAD REQUEST - Error: ${err}`);
        res.status(400).json({ error: 'Ocurrio un error al borrar el producto' });
      } else {
        if (productoRemovido) {
          console.log(`DELETE - 200 - OK`);
          res.status(200).json({ productoRemovido: productoRemovido });
        } else {
          console.log(`DELETE - 404 - NOT FOUND`);
          res.status(404).json({ error: 'Producto no encontrado' });
        }
      }
    })
  }
}