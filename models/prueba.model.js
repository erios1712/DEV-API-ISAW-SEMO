import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const Prueba = sequelize.define(
    "Prueba",
    {
        reg1: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        reg2: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        reg3: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        reg4: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        reg5: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },        
    },
    {
        tableName: "Test",
        timestamps: true,
    }
);

export default Prueba;