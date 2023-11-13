import { Router } from "express";
import * as controllerData from "../controllers/data.controller.js";
const router = Router();

router.get("/temperatures", controllerData.findAllTemps);
router.get("/connstatus", controllerData.findConnStatus);

export default router;