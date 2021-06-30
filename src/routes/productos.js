const router = require('express').Router();
const admin = require('../config/adminConfig.js');
const productosController = require('../controllers/productosController');

router.get('/listar/:id?', (req, res) => {
  if (req.params.id) {
    res.status(200).json({ mensaje: `Ruta: unico producto ${req.params.id}` });
  }
  else {
    res.status(200).json({ mensaje: `Ruta: lista productos` });
  }
});

router.post('/agregar', (req, res) => {
  if (admin) {
    const {nombre,descripcion,codigo,foto,precio,stock} = req.body;
    const producto = productosController.GenerarProducto({
      nombre:nombre,
      timestamp:Date.now(),
      descripcion:descripcion,
      codigo:codigo,
      foto:foto,
      precio:precio,
      stock:stock
    });
    console.log('Guardando producto');
    producto.save((err,producto) => {
      if(err){
        console.log(`POST - 400 - Error al guardar el producto ${err}`);
        res.status(400).json({error:'Ocurrio un error al guardar el producto'});
      }else{
        console.log(`POST - 200 - Producto guardado`);
        res.status(200).json({ status: `OK`, producto: producto });
      }
    });
  } else {
    res.status(400).json({ error: 'No es un administrador' });
  }
});

router.put('/actualizar/:id', (req, res) => {
  if (admin) {
    const producto = req.body;
    res.status(200).json({ mensaje: `Ruta: actualizar ${req.params.id}`, productoNuevo: producto });
  } else {
    res.status(400).json({ error: 'No es un administrador' });
  }
});

router.delete('/borrar/:id', (req, res) => {
  if (admin) {
    res.status(200).json({ mensaje: `Ruta: borrar ${req.params.id}` });
  }
  else {
    res.status(400).json({ error: 'No es un administrador' });
  }
});

module.exports = router;