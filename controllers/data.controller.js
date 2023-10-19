import { Op } from "sequelize";
import modelData from "../models/prueba.model.js";


export const findAll = async (req, res) => {
    try {      
        let registersData = await modelData.findAll();

        res.json({ code: 200, message: "ok", registersData });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: "Error al leer los registros.",
        });
    }
};


