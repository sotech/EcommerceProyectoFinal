const { Producto } = require("./producto");
class Carrito {
    constructor(_id) {
        this.id = _id;
        this.timestamp = Date.now();
        this.productos = []
    }

    inicializarProductos(_productos){
        this.productos = _productos;
    }

    agregarProducto(producto){
        this.productos.push(producto);
    }

    obtenerProductos(){
        let lista = "";
        this.productos.forEach(producto => {
            lista += producto + "\n";
        });
        return lista;
    }
}

module.exports = { Carrito };