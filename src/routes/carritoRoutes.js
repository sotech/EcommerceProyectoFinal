const router = require("express").Router();
const carritoController = require("../controllers/carritoController.js");

router.get("/listar/:id?", carritoController.listarCarrito);
router.post("/crear",carritoController.crearCarrito);
router.post("/agregar/:id_producto", carritoController.agregarProducto);
router.delete("/borrar/:id", carritoController.borrarProducto);
router.delete("/borrarCarrito/:id", carritoController.borrarCarrito);

module.exports = router;