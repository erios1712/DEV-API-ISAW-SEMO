import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const ambientTemp = sequelize.define(
    "ambientTemp",
    {
        ambientTemp1: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        ambientTemp2: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        ambientTemp3: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        ambientTemp4: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        ambientTemp5: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        ambientTemp6: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        ambientTemp7: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        ambientTemp8: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },   
    },
    {
        tableName: "ambientTemp",
        timestamps: true,
        updatedAt: false,
        createdAt: "time"
    }
);

export default ambientTemp;