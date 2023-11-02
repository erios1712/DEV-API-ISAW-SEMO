import { Router } from "express";
import * as controllerConnection from "../controllers/data.controller.js";
const router = Router();

router.post("/", controllerConnection.saveRegisters);

export default router;