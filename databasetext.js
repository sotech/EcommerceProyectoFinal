const fs = require('fs');
class Database {
    constructor(_nombre){
        this.nombre = _nombre;
    }

    async leer(){
        try{
            //Leer archivo
            let archivo = await fs.promises.readFile(this.nombre,"utf-8");
            let contenido = JSON.parse(archivo);
            return contenido;
        }catch(err){
            console.log("Ocurrio un error al Leer el archivo: " + err);
        }
    }

    async guardar(contenido){
        try{
            //Guardar
            await fs.promises.writeFile(this.nombre,JSON.stringify(contenido));
            console.log("Guardado exitoso");
        } catch (err) {
            console.log("Ocurrio un error al Guardar el archivo: " + err);
        }
    }
}

module.exports = { Database };