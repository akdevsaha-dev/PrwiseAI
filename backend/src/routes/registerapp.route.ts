import express, { Router } from "express";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { registerApp } from "../controllers/registerApp.controller.js";

const router: Router = express.Router();

router.post("/callback", authMiddleware, registerApp);

export default router;
