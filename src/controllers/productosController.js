const productosAPI = require('../api/productosAPI');

module.exports = {
  listarProducto: async(req, res) => {
    const { id } = req.params;
    try{
      if (id) {
        const resultado = await productosAPI.buscarUno(id);
        if(resultado){
          res.status(200).json({producto:resultado});
        }else{
          res.status(404).json({ error: 'Producto no encontrado' });
        }
      } else {
        const resultado = await productosAPI.buscarTodos();
        if(resultado.length > 0 ){
          res.status(200).json({productos:resultado});
        }else{
          res.status(404).json({ error: 'No se encontraron productos' });
        }
      }
    }catch(e){
      console.log(e);
      res.status(400).json({ error: 'Error: ' + e });
    }
  },

  agregarProducto: async(req, res) => {
    const {nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const producto = {
      nombre: nombre,
      timestamp: Date.now(),
      descripcion: descripcion,
      codigo: codigo,
      foto: foto,
      precio: precio,
      stock: stock
    };
    try {
      await productosAPI.guardar(producto);
      res.status(201).json({ status: 'OK' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: 'Error: ' + e });
    }
  },

  actualizarProducto: async(req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const producto = {
      nombre: nombre,
      timestamp: Date.now(),
      descripcion: descripcion,
      codigo: codigo,
      foto: foto,
      precio: precio,
      stock: stock
    };
    try {
      await productosAPI.actualizar(id,producto);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: 'Error: ' + e });
    }
  },

  borrarProducto: async(req, res) => {
    const { id } = req.params;
    try {
      await productosAPI.borrar(id);
      res.status(200).json({ status: 'OK' });
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: 'Error: ' + e });
    }
  }
}