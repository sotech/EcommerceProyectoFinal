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
                    res.status(200).json(resultado[0]);
                }else{
                    res.status(400).json({ error: `Producto con id ${req.params.id} no encontrado`});
                }
            }
        });        
    }else{
        productosDB.leer().then((productos) => {
            if (productos){
                res.status(200).json(productos);
            }else{
                res.status(400).json({error: "No hay productos cargados"});
            }
        });
    }
});

routerProductos.post('/agregar', (req, res) => {
    if(esAdministrador){        
        productosDB.leer().then((_productos) => {
            if (_productos){
                productos = _productos;
            }
            let newId = productos.length + 1;
            let productoNuevo = new Producto(newId, req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock);
            productos.push(productoNuevo);
            productosDB.guardar(productos);
            res.status(200).json(productoNuevo);
        })
    }
    else{
        res.status(401).send({ error: -1, descripcion: `ruta '${req.originalUrl}' método ${req.method} no autorizada` });
    }
});

routerProductos.put('/actualizar/:id', (req, res) => {
    if (esAdministrador){
        //Cargar productos
        productosDB.leer().then((_productos) => {
            if (_productos){
                productos = _productos;
            }
            //Eliminar y reemplazar el producto
            let indexProducto = productos.findIndex(producto => producto.id == req.params.id);
            if(indexProducto >= 0){     
                let nuevoProducto = new Producto(productos[indexProducto].id, req.body.nombre, req.body.descripcion, req.body.codigo, req.body.foto, req.body.precio, req.body.stock);
                productos.splice(indexProducto,1,nuevoProducto);
                productosDB.guardar(productos);                
                res.status(200).json(nuevoProducto);
            }            
        })
    }
    else{
        res.status(401).json({ error: -1, descripcion: `ruta '${req.originalUrl}' método ${req.method} no autorizada` });
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
            let productosBorrados = []
            if(indexProducto >= 0){
                productosBorrados = productos.splice(indexProducto,1);
            }
            productosDB.guardar(productos);
            res.status(200).json(productosBorrados);
        })
    }else{
        res.status(401).json({ error: -1, descripcion: `ruta '${req.originalUrl}' método ${req.method} no autorizada` });
    }
});

//Carrito
app.use('/carrito', routerCarrito);

routerCarrito.get('/listar/:id?', (req, res) => {
    if(req.params.id){
        carritoDB.leer().then(carrito => {
            if (carrito){
                //Buscar producto del carrito
                let productoArray = carrito.productos.filter(p => p.id == req.params.id);
                if(productoArray.length > 0){
                    res.status(200).json(productoArray[0]);
                }else{
                    res.status(400).json({error:"No se encontro el producto del carrito con id: " + req.params.id});
                }
            }else{
                res.status(400).json({ error: "No se encontro el producto del carrito con id: " + req.params.id });
            }                
        })
    }else{
        carritoDB.leer().then((contenido) => {
            if(contenido){
                carrito.inicializarProductos(contenido.productos);
                let productosDelCarrito = carrito.obtenerProductos();
                res.status(200).json(productosDelCarrito);
            }
            else{
                res.status(400).json({error:'Carrito vacio'});
            }
        });
    }
});

routerCarrito.post('/agregar/:id_producto', (req, res) => {
    //Cargar productos
    productosDB.leer().then(contenido => {
        if(contenido){
            productos = contenido;
            //Buscar producto con id;
            let productoBuscadoArray = productos.filter(p => p.id == req.params.id_producto);
            if(productoBuscadoArray.length > 0){
                let productoBuscado = productoBuscadoArray[0];
                //Producto encontrado, agregar al carrito
                carrito.agregarProducto(productoBuscado);
                //Guardar carrito
                carritoDB.guardar(carrito).then(() => {
                    res.status(200).json(productoBuscado);                
                })
            }else{
                res.status(400).json({error:"No se encontro el producto con id: " + req.params.id_producto});
            }
        }
    })
});

routerCarrito.delete('/borrar/:id', (req, res) => {
    let productosBorrados = carrito.borrarProducto(req.params.id);
    carritoDB.guardar(carrito).then(() => {
        res.status(200).json(productosBorrados);
    })
});

app.get('/', (req, res) => {
    res.sendFile("public/main.html",{root:__dirname});
});



app.listen(port, () => {
    console.log(`Servidor corriendo en ` + port);   
});