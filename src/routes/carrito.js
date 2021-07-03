const router = require('express').Router();
const carritoController = require('../controllers/carritoController');

router.get('/listar/:id?', carritoController.listarCarrito);

router.post('/crear', carritoController.inicializarCarrito);

router.post('/agregar/:id_producto', carritoController.agregarProducto);

router.delete('/borrar/:id', carritoController.borrarProducto);

module.exports = router;