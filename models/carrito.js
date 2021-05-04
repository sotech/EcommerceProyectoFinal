class Carrito {
    constructor(_id) {
        this.id = _id;
        this.timestamp = Date.now();
        this.productos = [];
    }
}

module.exports = { Carrito };