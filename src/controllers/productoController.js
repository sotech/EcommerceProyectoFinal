const productoRepository = require('../repositories/productoRepositoy')

exports.agregarProducto = async (req, res) => {
  try {
    const { descripcion, precio, fotoUrl, categoria } = req.body;
    const payload = {
      descripcion,
      precio,
      fotoUrl,
      categoria
    };
    const producto = await productoRepository.crearProducto(payload);
    res.status(201).json({ producto: producto })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.listarProductos = async (req, res) => {
  try {
    const productos = await productoRepository.obtenerProductos();
    if(productos.length > 0) res.status(200).json({ productos: productos });
    else res.status(404).json({ error: 'No hay productos cargados' });
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.listarProductosPorCategoria = async (req, res) => {
  try {
    const {categoria} = req.params;
    const productos = await productoRepository.obtenerProductosPorCategoria(categoria);
    if (productos.length > 0) res.status(200).json({ productos: productos });
    else res.status(404).json({ error: `No hay productos cargados del tipo "${categoria}"` });
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.listarProducto = async (req, res) => {
  try {
    const {id} = req.params;
    const producto = await productoRepository.productoById(id);
    res.status(200).json({ producto: producto })
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
    const producto = await productoRepository.actualizarProducto(id,payload);
    res.status(200).json({ status: 'Ok' })
  } catch (err) {
    res.status(500).json({ error: err })
  }
}

exports.borrarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await productRepository.removerProducto(id)
    res.status(200).json({
      status: true,
      data: producto,
    })
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err
    })
  }
}