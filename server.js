const express = require('express');
const { Carrito } = require('./carrito');
const { Database } = require('./databasetext');
const { Producto } = require('./producto');
const app = express();
const port = process.env.PORT || 8080;
const routerProductos = express.Router();
const routerCarrito = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let esAdministrador = true;

let productosDB = new Database(__dirname + "/productosDB.txt");
let productos = [];

let carritoDB = new Database(__dirname + "/carritoDB.txt");
let carrito = new Carrito(Math.floor(Math.random() * 100));

//Productos
app.use('/productos',routerProductos);

routerProductos.get('/listar/:id?', (req,res) => {
    if(req.params.id){
        productosDB.leer().then((contenido) => {
            if(contenido){
                productos = contenido;
                let resultado = productos.filter(x => x.id == req.params.id);
                if(resultado.length > 0){
                    res.status(200).send("Producto encontrado: " + resultado[0]);
                }else{
                    res.status(400).send(`Producto con id ${req.params.id} no encontrado`);
                }
            }
        });        
    }else{
        productosDB.leer().then((contenido) => {
            if(contenido){
                productos = contenido;
                let respuesta = "";
                productos.forEach(producto => {
                    respuesta += producto + "\n";
                });
                res.status(200).send(respuesta);
            }else{
                res.status(200).send("No hay productos cargados");
            }
        });
    }
});

routerProductos.post('/agregar', (req, res) => {
    if(esAdministrador){        
        productosDB.leer().then((contenido) => {
            if(contenido){
                productos = contenido;                                
            }
            let newId = productos.length + 1;
            let productoNuevo = new Producto(newId, req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock);
            productos.push(productoNuevo);
            productosDB.guardar(productos);
        })
        res.status(200).send("Producto agregado: " + JSON.stringify(req.body));
    }
    else{
        res.status(401).send({ error: -1, descripcion: `ruta '${req.originalUrl}' método ${req.method} no autorizada` });
    }
});

routerProductos.put('/actualizar/:id', (req, res) => {
    if (esAdministrador){
        //Cargar productos
        productosDB.leer().then((contenido) => {
            if(contenido){
                productos = contenido;
            }
            //Eliminar el producto si es que existe
            let indexProducto = productos.findIndex(producto => producto.id == req.params.id);
            if(indexProducto >= 0){     
                let newProducto = new Producto(req.params.id, req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock);
                productos[indexProducto] = newProducto;
                productosDB.guardar(productos);                
            }            
        })
        res.status(200).send("Actualizar producto: " + req.params.id);
    }
    else{
        res.status(401).send({ error: -1, descripcion: `ruta '${req.originalUrl}' método ${req.method} no autorizada` });
    }
});

routerProductos.delete('/borrar/:id', (req, res) => {
    if(esAdministrador){
        productosDB.leer().then((contenido) => {
            if(contenido){
                productos = contenido;
            }
            //Buscar y borrar el elemento
            let indexProducto = productos.findIndex(producto => producto.id == req.params.id);
            if(indexProducto >= 0){
                productos.splice(indexProducto,1);
            }
            productosDB.guardar(productos);
        })
        res.status(200).send("Borrar producto: " + req.params.id);
    }else{
        res.status(401).send({ error: -1, descripcion: `ruta '${req.originalUrl}' método ${req.method} no autorizada` });
    }
});

//Carrito
app.use('/carrito', routerCarrito);

routerCarrito.get('/listar/:id?', (req, res) => {
    if(req.params.id){
        res.status(200).send("Listar producto del carrito con id: " + req.params.id);
    }else{
        res.status(200).send("Listado de todos los productos del carrito");
    }
});

routerCarrito.post('/agregar/:id_producto', (req, res) => {
    res.status(200).send("Agregar al carrito el producto con id: " + req.params.id_producto);
});

routerCarrito.delete('/borrar/:id', (req, res) => {
    res.status(200).send("Borrar un producto del carrito con id: " + req.params.id);
});

app.get('/', (req, res) => {
    res.sendFile("public/main.html",{root:__dirname});
});



app.listen(port, () => {
    console.log(`Servidor corriendo en ` + port);   
});