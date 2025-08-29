import { Router } from "express";

const router = Router();

// Temporary placeholder
router.get("/", (_, res) => {
  res.json({ ok: true, route: "notes" });
});

export default router;
