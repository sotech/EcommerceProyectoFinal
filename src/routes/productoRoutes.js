const router = require("express").Router();
const productoController = require("../controllers/productoController.js");

router.get("/listar/:id?", productoController.listarProducto);
router.get("/filtrar/nombre/:nombre", productoController.listarProductoPorNombre);
router.get("/filtrar/codigo/:codigo", productoController.listarProductoPorCodigo);
router.get("/filtrar/precio/", productoController.listarProductoPorRangoPrecio);
router.get("/filtrar/stock/", productoController.listarProductoPorRangoStock);
router.post("/agregar", productoController.agregarProducto);
router.put("/actualizar/:id",productoController.actualizarProducto);
router.delete("/borrar/:id",productoController.borrarProducto);

module.exports = router;