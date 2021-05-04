const express = require('express');
const app = express();
const rutasProductos_fs = require('./rutas/rutasProductos_fs');
const rutasProductos_sqlite = require('./rutas/rutasProductos_sqlite');
const rutasProductos_mariadb = require('./rutas/rutasProductos_mariadb');
const rutasProductos_mongoLocal = require('./rutas/rutasProductos_mongoLocal');
const rutasCarrito_fs = require('./rutas/rutasCarrito_fs');
const rutasCarrito_sqlite = require('./rutas/rutasCarrito_sqlite');
const rutasCarrito_mariadb = require('./rutas/rutasCarrito_mariadb');
const rutasCarrito_mongoLocal = require('./rutas/rutasCarrito_mongoLocal');

const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * 1: FS
 * 2: SQLite
 * 3: MariaDB
 * 4: Mongo
 */
const persistenciaElegida = 3;

switch(persistenciaElegida){
    case 1:
        app.use('/api', rutasProductos_fs);
        app.use('/api', rutasCarrito_fs);
        break;
    case 2:
        app.use('/api', rutasProductos_sqlite);
        app.use('/api', rutasCarrito_sqlite);
        break;
    case 3:
        app.use('/api', rutasProductos_mariadb);
        app.use('/api', rutasCarrito_mariadb);
        break;
    case 4:
        app.use('/api', rutasProductos_mongoLocal);
        app.use('/api', rutasCarrito_mongoLocal);
        break;
}

app.get('/', (req, res) => {
    res.send("Servidor iniciado");
});

app.listen(port, () => {
    console.log(`Servidor corriendo en ` + port);   
});