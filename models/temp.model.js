import { DataTypes } from "sequelize";
import sequelize from "../database/database.js";

const temp = sequelize.define(
    "Temp",
    {
        temp1: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        temp2: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        temp3: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        temp4: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        temp5: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        temp6: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        temp7: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        temp8: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        temp9: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        temp10: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        temp11: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },
        temp12: {
            type: DataTypes.INTEGER,
            allowNull: true,            
        },   
    },
    {
        tableName: "Temp",
        timestamps: true,
        updatedAt: false,
        createdAt: "time"
    }
);

export default temp;