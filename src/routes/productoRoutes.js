const router = require("express").Router();
const productoController = require("../controllers/productoController.js");

router.get("/", productoController.listarProductos);
router.get("/listar/:id", productoController.listarProducto);
router.get("/:categoria", productoController.listarProductosPorCategoria);
router.post("/agregar", productoController.agregarProducto);
router.put("/actualizar/:id",productoController.actualizarProducto);
router.delete("/borrar/:id",productoController.borrarProducto);

module.exports = router;