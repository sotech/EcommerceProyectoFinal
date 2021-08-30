const carritoAPI = require('../api/carritoAPI')
const mailer = require('../utils/gmailer');
const twilio = require('../utils/twilio');

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

exports.comprar = async(req,res)=>{
  const{id} = req.params;
  const{nombre,email,telefono} = req.body;
  try{
    const resultado = await carritoAPI.comprar(id);
    //Al realizar la compra, enviar mail
    mailer.pedidoCarritoMail(nombre,email,resultado.items);
    //Al realizar la compra, enviar WPP
    twilio.enviarWppPedido(nombre,email);
    //Al realizar la compra, enviar SMS
    twilio.enviarSMSPedidoRecibido(telefono);
    res.status(200).json({comprado:resultado});
  }catch(e){
    res.status(400).json({error:e});
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
  const { id_producto } = req.params;
  const { id_carrito } = req.body;
  try{
    const resultado = await carritoAPI.borrarProducto(id_carrito, id_producto);
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
