const router = require("express").Router();

router.get("/", (req,res) => {
  res.render('productos');
});

router.get("/productos", (req, res) => {
  res.render('productos');
});

router.get("/carrito", (req, res) => {
  res.render('carrito');
});

module.exports = router;