import express, { Router } from "express";
import { webhookEvent } from "../controllers/webhooks.controller.js";
import { aiLimiter } from "../middleware/rateLimiter.js";

const router: Router = express.Router();

router.post("/webhook", aiLimiter, webhookEvent);
export default router;
