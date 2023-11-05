import { Router } from "express";
import viewCtrl from "../controllers/views.controllers.js";
import auth from "../middlewares/auth.middlewares.js";
const router = Router();

//rutas de vistas
router.get(["/"], viewCtrl.login);
router.get(["/dashboardMB"], auth.verifyToken, viewCtrl.dashboardMB);

export default router;