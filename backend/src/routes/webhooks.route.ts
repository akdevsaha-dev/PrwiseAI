import express, { Router } from "express";
import { webhookEvent } from "../controllers/webhooks.controllers.js";

const router: Router = express.Router();

router.post("/webhook", webhookEvent);
export default router;
