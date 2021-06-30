const express = require('express');
const app = express();
const indexRoutes = require('./src/routes/index');
const productosRoutes = require('./src/routes/productos');
const carritoRoutes = require('./src/routes/carrito');

const port = process.env.PORT || 8080;

app.use(express.json());

app.use('/', indexRoutes);
app.use('/productos', productosRoutes);
app.use('/carrito', carritoRoutes);

app.listen(port, () => {
    console.log(`Servidor corriendo en ` + port);   
});