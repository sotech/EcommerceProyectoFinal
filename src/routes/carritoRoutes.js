const router = require("express").Router();
const carritoController = require("../controllers/carritoController.js");

router.get("/listar/:id", carritoController.listarCarrito);
router.post("/crear",carritoController.crearCarrito);
router.post("/agregar/:id_producto", carritoController.agregarProducto);
router.post("/comprar/:id",carritoController.comprar);
router.delete("/borrar/:id_producto", carritoController.borrarProducto);
router.delete("/borrarCarrito/:id", carritoController.borrarCarrito);

module.exports = router;