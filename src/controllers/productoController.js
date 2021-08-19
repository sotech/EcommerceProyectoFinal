const productoAPI = require('../api/productoAPI')

exports.listarProducto = async (req, res) => {
  try {
    const {id} = req.params;
    if(id){
      const producto = await productoAPI.obtenerProductoPorId(id);
      res.status(200).json({ data: producto })
    }else{
      const productos = await productoAPI.obtenerProductos();
      if(productos.length > 0) {
        res.status(200).json({data:productos});
      }
      else {
        res.status(200).json({ error: 'No hay productos cargados' })
      }
    }
  } catch (err) {
    res.status(500).json({ error: err })
  }
};

exports.agregarProducto = async (req, res) => {
  try {
    const payload = req.body;
    const producto = await productoAPI.agregarProducto(payload);
    res.status(201).json({ data: producto })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { descripcion, precio, fotoUrl, categoria } = req.body;
    const payload = {
      descripcion,
      precio,
      fotoUrl,
      categoria
    };
    await productoAPI.actualizarProducto(id,payload);
    res.status(200).json({ status: 'Ok' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.borrarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productoAPI.borrarProducto(id)
    res.status(200).json({ data: producto })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}