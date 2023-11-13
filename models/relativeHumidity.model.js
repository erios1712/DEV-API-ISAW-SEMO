import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const relativeHumidity = sequelize.define(
    "relativeHumidity",
    {
        rh1: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        rh2: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        rh3: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        rh4: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        rh5: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        rh6: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        rh7: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        rh8: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },   
    },
    {
        tableName: "relativeHumidity",
        timestamps: true,
        updatedAt: false,
        createdAt: "time"
    }
);

export default relativeHumidity;