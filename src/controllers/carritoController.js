const Carrito = require('../models/carritoModel');
const Producto = require('../models/productoModel');

module.exports = {
  listarCarrito: (req, res) => {
    const { id } = req.params;
    if (id) {
      Carrito.findById(1, (err, carrito) => {
        if (err) {
          console.log(`GET - 400 - BAD REQUEST - Error: ${err}`);
          res.status(400).json({ error: 'Ocurrio un error al obtener el carrito' });
        } else {
          if (carrito) {
            if(carrito.productos.length > 0){
              const producto = carrito.productos.filter(p => p.id == id);
              if (producto.length > 0) {
                console.log('GET - 200 - OK');
                res.status(200).json({ producto: producto[0] });
              }else{
                console.log('GET - 404 - NOT FOUND');
                res.status(404).json({ error: 'Producto no encontrado' });
              }
            }else{
              console.log(`GET - 200 - OK`);
              res.status(200).json({ error: 'No hay productos' });
            }
          } else {
            console.log(`GET - 404 - NOT FOUND`);
            res.status(404).json({ error: 'No hay un carrito creado' });
          }
        }
      })
    } else {
      Carrito.findById(1, (err, carrito) => {
        if (err) {
          console.log(`GET - 400 - BAD REQUEST - Error: ${err}`);
          res.status(400).json({ error: 'Ocurrio un error al obtener el carrito' });
        } else {
          if (carrito) {
            console.log('GET - 200 - OK');
            res.status(200).json({ carrito: carrito });
          } else {
            console.log(`GET - 404 - NOT FOUND`);
            res.status(404).json({ error: 'No hay un carrito creado' });
          }
        }
      })
    }
  },
  inicializarCarrito: (req,res) => {
    const carritoNuevo = new Carrito({
      _id: 1,
      timestamp: Date.now(),
      productos: []
    });
    carritoNuevo.save((err, carrito) => {
      if (err) {
        console.log(`POST - 400 - BAD REQUEST - Error:${err}`);
        res.status(400).json({ error: 'Ocurrio un error al crear el carrito' });
      } else {
        console.log(`POST - 201 - OK`);
        res.status(201).json({ carrito: carrito });
      }
    })
  },

  agregarProducto: (req, res) => {
    const { id_producto } = req.params;

    Carrito.findById(1, (err, carrito) => {
      if (err) {
        console.log(`POST - 400 - BAD REQUEST - Error ${err}`);
        res.status(400).json({error:'Ocurrio un error al buscar el carrito'});
      } else {
        if (carrito) {
          Producto.findById(id_producto, (err, producto) => {
            if (err) {
              console.log(`POST - 400 - BAD REQUEST - Error ${err}`);
              res.status(400).json({ error: 'Ocurrio un error al buscar el producto' });
            } else {
              if (producto) {
                carrito.productos.push(producto);
                carrito.save((err, carrito) => {
                  if (err) {
                    console.log(`POST - 400 - BAD REQUEST - Error: ${err}`);
                    res.status(400).json({ error: 'Ocurrio un error al guardar el nuevo carrito' });
                  } else {
                    console.log(`POST - 200 - OK`);
                    res.status(200).json({ carrito: carrito });
                  }
                })
              } else {
                console.log(`POST - 404 - NOT FOUND - Error: ${err}`);
                res.status(404).json({ error: 'Producto no encontrado' });
              }
            }
          });
        } else {
          console.log(`POST - 404 - NOT FOUND`);
          res.status(404).json({ error: 'No hay un carrito creado' });
        }
      }
    })
  },

  borrarProducto: (req, res) => {
    const { id } = req.params;
    Carrito.findById(1, (err, carrito) => {
      if (err) {
        console.log(`POST - 400 - BAD REQUEST - Error ${err}`);
        res.status(400).json({ error: 'Ocurrio un error al buscar el carrito' });
      } else {
        if(carrito){
          const productosRestantes = carrito.productos.filter(p => p._id != id);
          const hayBorrado = productosRestantes.length < carrito.productos.length;

          carrito.productos = productosRestantes;
          carrito.save((err,carrito) => {
            if(err){
              console.log(`DELETE - 400 - BAD REQUEST - Error ${err}`);
              res.status(400).json({ error: 'Ocurrio un error al guardar el nuevo carrito' });
            }else{
              if(hayBorrado){
                console.log(`DELETE - 200 - OK`);
                res.status(200).json({ carrito: carrito });
              }else{
                console.log(`DELETE - 404 - NOT FOUND`);
                res.status(404).json({ error: 'Producto no encontrado' });
              }
            }
          })
        }else{
          console.log(`POST - 404 - NOT FOUND`);
          res.status(404).json({ error: 'No hay un carrito creado' });
        }
      }
    })
  }
}