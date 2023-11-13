import sequelize from "../database/database.js";
import modelDevice from "../models/device.model.js";


const login = (req, res) => {
    res.render("loginpage.handlebars", {
        nav: false,
    }); 
}

const dashboardMB = async (req, res) => {
    let conexiones = await modelDevice.findAll();
    conexiones = conexiones.map((conexion) => conexion.toJSON());
    res.render("dashboardMB.handlebars", {
        conexiones,
        nav: true
    }); 
}


let viewCtrl = {
    login,
    dashboardMB
}

export default viewCtrl;