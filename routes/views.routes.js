import { Router } from "express";
import viewCtrl from "../controllers/views.controllers.js";
const router = Router();

//rutas de vistas
router.get(["/"], viewCtrl.home);

export default router;