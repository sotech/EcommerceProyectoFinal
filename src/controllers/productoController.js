const productoAPI = require('../api/productoAPI')

exports.listarProductoPorNombre = async (req,res) => {
  try{
    const {nombre} = req.params;
    const producto = await productoAPI.obtenerProductoPorNombre(nombre);
    if(producto) res.status(200).json({data:producto});
    else res.status(404).json({error:'Producto no encontrado'});
  }catch(e){
    res.status(400).json({error:e});
  }
}

exports.listarProductoPorCodigo = async (req, res) => {
  try {
    const { codigo } = req.params;
    const producto = await productoAPI.obtenerProductoPorCodigo(codigo);
    if (producto) res.status(200).json({ data: producto });
    else res.status(404).json({ error: 'Producto no encontrado' });
  } catch (e) {
    res.status(400).json({ error: e });
  }
}

exports.listarProductoPorRangoPrecio = async(req,res)=>{
  try{
    const {min,max} = req.query;
    const productos = await productoAPI.obtenerProductoPorRangoPrecio(min,max);
    if(productos.length > 0) res.status(200).json({data:productos})
    else res.status(404).json({error:'No hay productos en ese rango de precios'});
  }catch(e){
    res.status(400).json({ error: e });
  }
};

exports.listarProductoPorRangoStock = async (req, res) => {
  try {
    const { min, max } = req.query;
    const productos = await productoAPI.obtenerProductoPorRangoStock(min, max);
    if (productos.length > 0) res.status(200).json({ data: productos })
    else res.status(404).json({ error: 'No hay productos en ese rango de stock' });
  } catch (e) {
    res.status(400).json({ error: e });
  }
};

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
        res.status(404).json({ error: 'No hay productos cargados' })
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