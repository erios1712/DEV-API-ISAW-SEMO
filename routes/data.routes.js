import { Router } from "express";
import * as controllerData from "../controllers/data.controller.js";
const router = Router();

router.get("/", controllerData.findAll);

export default router;