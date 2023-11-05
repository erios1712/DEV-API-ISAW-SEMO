import app from "./app.js";
import sequelize from "./database/database.js"

//configuracion dotenv
import dotenv from "dotenv";

//configuracion modulo path y dirname
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, "./.env")});


const main = async () => {
    try {
    // init connection with database
        await sequelize.authenticate();
        await sequelize.sync({force: true, alter: true});

    //start server
        app.listen(3000, () => {
        console.log("Servidor escuchando en puerto 3000.");
    });    
        
    } catch (error) {
        console.log("Ha ocurrido un error al iniciar el servidor.");       
    }
}
     

main();