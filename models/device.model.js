import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const devices = sequelize.define(
    "devices",
    {
        ip: {
            type: DataTypes.STRING,
            allowNull: true,            
        },
        port: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        modbusid: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        conn: {
            type: DataTypes.BOOLEAN,
            allowNull: true,            
        },
    },
    {
        tableName: "devices",
        timestamps: true,
        updatedAt: false,
        createdAt: "time"
    }
);

export default devices;