const carritoAPI = require('../api/carritoAPI')

exports.listarCarrito = async (req, res) => {
  try {
    const { id } = req.params;
    const carrito = await carritoAPI.obtenerCarrito(id);
    if(carrito) res.status(200).json({ data: carrito });
    else res.status(404).json({status:'No hay carrito'})
  } catch (err) {
    res.status(500).json({ error: err })
  }
};

exports.crearCarrito = async (req,res) => {
  try{
    const carrito = await carritoAPI.crearCarrito();
    res.status(201).json({carrito:carrito}); 
  }catch(e){
    res.status(500).json({error:e});
  }
}

exports.agregarProducto = async (req,res) => {
  const {id_producto} = req.params;
  const {id_carrito} = req.body;
  try{
    const resultado = await carritoAPI.agregarProducto(id_carrito,id_producto);
    res.status(201).json({status:resultado});
  }catch (e){
    res.status(500).json({ error: e });
  }
}

exports.borrarProducto = async (req,res) => {
  const {id} = req.params;
  try{
    const resultado = await carritoAPI.borrarProducto(id);
    res.status(200).json({status:resultado});
  }catch(e){
    res.status(500).json({error:e})
  }
}

exports.borrarCarrito = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await carritoAPI.borrarCarrito(id);
    res.status(200).json({ status: resultado });
  } catch (e) {
    res.status(500).json({ error: e })
  }
}
