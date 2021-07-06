const Carrito = require('../models/carritoModel');
const Producto = require('../models/productoModel');
const mailer = require('../utils/gmailer');
const twilio = require('../utils/twilio');

module.exports = {
  listarCarrito: (req, res) => {
    const { id } = req.params;
    Carrito.findById(id, (err, carrito) => {
      if (err) {
        res.status(400).json({ error: 'Ocurrio un error al obtener el carrito', err: err });
      } else {
        if (carrito) {
          res.status(200).json({ carrito: carrito });
        } else {
          res.status(404).json({ error: 'No hay un carrito creado' });
        }
      }
    })
  },

  submitCarrito: async(req,res) => {
    const {id} = req.params;
    const{nombre,email,telefono} = req.body;
    const carrito = await Carrito.findOne({_id:id}).populate('productos');
    mailer.pedidoCarritoMail(nombre,email,carrito.productos);
    twilio.enviarWpp(`Nuevo pedido de ${nombre} - ${email}`);
    twilio.enviarSMSPedidoRecibido(telefono);
    res.status(200).json({estado:'Carrito submiteado',carrito:carrito});
  },

  inicializarCarrito: (req, res) => {
    const carritoNuevo = new Carrito({
      timestamp: Date.now(),
      productos: []
    });
    carritoNuevo.save((err, carrito) => {
      if (err) {
        res.status(400).json({ error: 'Ocurrio un error al crear el carrito', err: err });
      } else {
        res.status(201).json({ carrito: carrito });
      }
    })
  },

  agregarProducto: (req, res) => {
    const { id_producto } = req.params;
    const { id_carrito} = req.body;
    Carrito.findById(id_carrito, (err, carrito) => {
      if (err) {
        res.status(400).json({ error: 'Ocurrio un error al buscar el carrito', err: err });
      } else {
        if (carrito) {
          Producto.findById(id_producto, (err, producto) => {
            if (err) {
              res.status(400).json({ error: 'Ocurrio un error al buscar el producto', err: err });
            } else {
              if (producto) {
                carrito.productos.push(producto);
                carrito.save((err, carrito) => {
                  if (err) {
                    res.status(400).json({ error: 'Ocurrio un error al guardar el nuevo carrito', err: err });
                  } else {
                    res.status(200).json({ carrito: carrito });
                  }
                })
              } else {
                res.status(404).json({ error: 'Producto no encontrado' });
              }
            }
          });
        } else {
          res.status(404).json({ error: 'No hay un carrito creado' });
        }
      }
    })
  },

  borrarProducto: (req, res) => {
    const { id } = req.params;
    Carrito.findById(1, (err, carrito) => {
      if (err) {
        res.status(400).json({ error: 'Ocurrio un error al buscar el carrito', err: err });
      } else {
        if (carrito) {
          const productosRestantes = carrito.productos.filter(p => p._id != id);
          const hayBorrado = productosRestantes.length < carrito.productos.length;
          carrito.productos = productosRestantes;
          carrito.save((err, carrito) => {
            if (err) {
              res.status(400).json({ error: 'Ocurrio un error al guardar el nuevo carrito', err: err });
            } else {
              if (hayBorrado) {
                res.status(200).json({ carrito: carrito });
              } else {
                res.status(404).json({ error: 'Producto no encontrado' });
              }
            }
          })
        } else {
          res.status(404).json({ error: 'No hay un carrito creado' });
        }
      }
    })
  }
}