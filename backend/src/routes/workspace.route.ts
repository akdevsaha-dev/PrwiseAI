import express, { Router } from "express";
import { workspaceSetup } from "../controllers/workspace.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router: Router = express.Router();
router.post("/onboarding/workspace-setup", authMiddleware, workspaceSetup);

export default router;
