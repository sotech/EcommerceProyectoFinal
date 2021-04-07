const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const routerProductos = require('./rutasProductos');
const routerCarrito = require('./rutasCarrito');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let esAdministrador = true;


//Productos
app.use('/productos', routerProductos);

//Carrito
app.use('/carrito', routerCarrito);



app.get('/', (req, res) => {
    res.sendFile("public/main.html",{root:__dirname});
});



app.listen(port, () => {
    console.log(`Servidor corriendo en ` + port);   
});