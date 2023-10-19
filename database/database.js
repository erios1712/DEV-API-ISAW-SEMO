//importacion sequelize
import { Sequelize } from "sequelize";

//configuracion dotenv
import dotenv from "dotenv";

//configuracion modulo path y dirname
import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({path: path.resolve(__dirname, "../.env")});

let database = process.env.DB_DATABASE;
let usuario = process.env.DB_USER;
let password = process.env.DB_PASSWORD;
let host = process.env.DB_HOST;

const sequelize = new Sequelize(database, usuario, password, {
    host,
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

export default sequelize;