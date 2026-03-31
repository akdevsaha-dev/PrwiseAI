import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import ngrok from "@ngrok/ngrok";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
    credentials: true,
  }),
);

app.get("/", (req: Request, res: Response) => {
  res.send("Wow this is nice");
});

app.listen(port, async () => {
  console.log(`Server running on http://localhost:${port}`);

  try {
    const listener = await ngrok.connect({
      addr: port,
      authtoken: process.env.NGROK_AUTHTOKEN,
      domain: "ghoul-ready-moccasin.ngrok-free.app",
    });

    console.log(`Ingress established at: ${listener.url()}`);
  } catch (err) {
    console.error("Ngrok failed:", err);
  }
});
