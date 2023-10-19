import express from "express";
import cors from "cors";
import upload from "express-fileupload";
import { create } from "express-handlebars";

//IMPORTACIÓN RUTAS DE VISTA
// import viewRoutes from "./routes/views.routes.js";

//IMPORTACIÓN RUTAS DE ENDPOINTS
import dataRoutes from "./routes/data.routes.js";

import * as path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

//middlewares generales
app.use(express.json());  //procesar json
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(upload()); //procesar form data

//CONFIGURACIONES GENERALES

// app.use("/public", express.static("public"));

//INICIO CONFIGURACIÓN DE EXPRESS HANDLEBARS

const hbs = create({
    partialsDir: [path.resolve(__dirname, "views/partials/")],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));


//FIN CONFIGURACIÓN DE EXPRESS HANDLEBARS

//RUTA DE VISTAS

// app.use("/", viewRoutes);

// RUTA DE ENDPOINTS

app.use("/api/v1/registros", dataRoutes);

//VISTA DE VISTA NOT FOUND
app.get("*", (req, res) => {
    res.render("notFound");
});

export default app;

