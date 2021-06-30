const router = require('express').Router();
const carritoController = require('../controllers/carritoController');

//Deberia haber un seguimiento del id del carrito generado
//para almacenar o borrar productos

router.get('/listar/:id',(req,res) => {
  res.status(200).json({mensaje: 'Ruta listar', carrito: {}});
});

router.post('/agregar/:id_producto', (req, res) => {
  res.status(200).json({mensaje: 'Ruta agregar producto', producto:req.params.id_producto});
});

router.delete('/borrar/:id', (req, res) => {
  res.status(200).json({mensaje: 'Ruta borrar producto', producto:req.params.id});
});

module.exports = router;