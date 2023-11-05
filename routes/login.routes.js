import { Router } from "express";
import controllerLogin from "../controllers/login.controller.js";
import auth from "../middlewares/auth.middlewares.js";
const router = Router();

router.post("/", auth.issueToken, controllerLogin.login);

export default router;