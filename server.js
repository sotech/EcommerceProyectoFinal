const express = require('express');
const app = express();
const rutasProductos_fs = require('./rutas/rutasProductos_fs');
const rutasProductos_sqlite = require('./rutas/rutasProductos_sqlite');
const rutasProductos_mariadb = require('./rutas/rutasProductos_mariadb');
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/fs', rutasProductos_fs);
app.use('/sql', rutasProductos_sqlite);
app.use('/mariadb', rutasProductos_mariadb);

app.get('/', (req, res) => {
    res.send("Servidor iniciado");
});

app.listen(port, () => {
    console.log(`Servidor corriendo en ` + port);   
});