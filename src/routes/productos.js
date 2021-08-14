const router = require('express').Router();
const productosController = require('../controllers/productosController');

router.get('/listar/:id?', productosController.listarProducto);

router.post('/agregar', productosController.agregarProducto);

router.put('/actualizar/:id', productosController.actualizarProducto);

router.delete('/borrar/:id', productosController.borrarProducto);

module.exports = router;