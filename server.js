const express = require('express');
const app = express();
const rutasProductos_fs = require('./rutas/rutasProductos_fs');
const rutasProductos_sqlite = require('./rutas/rutasProductos_sqlite');
const rutasProductos_mariadb = require('./rutas/rutasProductos_mariadb');
const rutasProductos_mongoLocal = require('./rutas/rutasProductos_mongoLocal');
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * 1: FS
 * 2: SQLite
 * 3: MariaDB
 * 4: Mongo
 */
const persistenciaElegida = 1;

switch(persistenciaElegida){
    case 1:
        app.use('/api', rutasProductos_fs);
        break;
    case 2:
        app.use('/api', rutasProductos_sqlite);
        break;
    case 3:
        app.use('/api', rutasProductos_mariadb);
        break;
    case 4:
        app.use('/api', rutasProductos_mongoLocal);
        break;
}

app.get('/', (req, res) => {
    res.send("Servidor iniciado");
});

app.listen(port, () => {
    console.log(`Servidor corriendo en ` + port);   
});