class Producto{
    constructor(_id, _nombre, _descripcion, _codigo, _foto, _precio, _stock){
        this.id = _id;
        this.timestamp = Date.now();
        this.nombre = _nombre;
        this.descripcion = _descripcion;
        this.codigo = _codigo;
        this.foto = _foto;
        this.precio = _precio;
        this.stock = _stock;
    }
}

module.exports = { Producto };