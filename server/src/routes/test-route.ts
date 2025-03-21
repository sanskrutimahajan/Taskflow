// src/routes/test-route.ts
import { Router, Request, Response } from "express";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  res.send("Test route is working!");
});

export default router;
