const fs = require('fs');
const path = require('path');
class DB_FS {
    constructor(nombreDB){        
        this.fileLocation = path.join(__dirname, "..", "/dbs/", nombreDB + ".txt");        
    }

    async InicializarDB(){
        //Crear por primera vez si es que no existe
        try {
            await fs.promises.readFile(this.fileLocation);
        } catch (e) {
            console.error("Error al leer el archivo por primera vez: " + e);            
            let productos = [];
            try {
                console.log("Creando archivo");
                await fs.promises.writeFile(this.fileLocation, JSON.stringify(productos));
            } catch (e) {
                console.error("Error al crear el archivo por primera vez: " + e);
            }
        }
    }

    GetIndexProductoPorId(lista, id){
        for (let index = 0; index < lista.length; index++) {
            if(lista[index].id == id){
                return index;
            }
        }
        return -1;
    }

    async ListarProducto(id){
        try{
            let listaProductos = await fs.promises.readFile(this.fileLocation);
            listaProductos = JSON.parse(listaProductos);
            let indexBuscado = this.GetIndexProductoPorId(listaProductos,id);
            if(indexBuscado >= 0){
                return listaProductos[indexBuscado];
            }else{
                return null;
            }
        }catch(e){
            console.error("Ocurrio un error al listar el producto por id: " + e);
        }
    }

    async ListarProductos(){
        try {
            let listaProductos = await fs.promises.readFile(this.fileLocation);
            listaProductos = JSON.parse(listaProductos);
            return listaProductos;
        } catch (e) {
            console.error("Ocurrio un error al listar los productos: " + e);
        }
    }

    async GuardarProducto(producto){
        try {
            let listaProductos = await fs.promises.readFile(this.fileLocation);
            listaProductos = JSON.parse(listaProductos);
            listaProductos.push(producto);
            try{
                await fs.promises.writeFile(this.fileLocation,JSON.stringify(listaProductos));
                return producto;
            }catch(e){
                console.error("Ocurrio un error al guardar la nueva lista de productos: " + e);                
            }            
        } catch (e) {
            console.error("Ocurrio un error al guardar el producto: " + e);
        }
    }

    async ActualizarProducto(id, producto){
        try {
            let listaProductos = await fs.promises.readFile(this.fileLocation);
            listaProductos = JSON.parse(listaProductos);
            let indexProductoModificar = this.GetIndexProductoPorId(listaProductos,id);            
            if (indexProductoModificar >= 0){
                listaProductos[indexProductoModificar] = producto;
                try{
                    await fs.promises.writeFile(this.fileLocation,JSON.stringify(listaProductos));
                    return 1;
                }catch(e){
                    console.error("Ocurrio un error al guardar la lista con el producto modificado: " + e);
                    return null;
                }
            }else{
                return 0;
            }
        } catch (e) {
            console.error("Ocurrio un error al modificar el producto por id: " + e);
        }
    }


    async BorrarProducto(id){
        try{
            let listaProductos = await fs.promises.readFile(this.fileLocation);
            listaProductos = JSON.parse(listaProductos);
            let indexProductoBuscado = this.GetIndexProductoPorId(listaProductos,id);
            if(indexProductoBuscado >= 0){
                listaProductos.splice(indexProductoBuscado,1);
                try{
                    await fs.promises.writeFile(this.fileLocation,JSON.stringify(listaProductos));
                    return 1;
                }catch(e){
                    console.error("Ocurrio un error al guardar la lista sin el producto removido: " + e);
                    return null;
                }
            }else{
                return 0;
            }
        }catch(e){
            console.error("Ocurrio un error al borrar el producto por id: " + e);
        }
    }
}

module.exports = { DB_FS };