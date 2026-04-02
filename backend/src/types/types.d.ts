import type { Session } from "./index.ts";

declare global {
  namespace Express {
    interface Request {
      session: Session;
    }
  }
}
