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
        return this.productos;
    }

    borrarProducto(_id){
        let indexProducto = this.productos.findIndex(p => p.id == _id);
        if(indexProducto >= 0){
            return this.productos.splice(indexProducto,1);

        }else{
            console.log("Error al buscar producto con id: " + _id);
            return {};
        }
    }
}

module.exports = { Carrito };