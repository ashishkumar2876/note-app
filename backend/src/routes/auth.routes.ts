import { Router } from "express";
import { signup, verifyOtpController, googleAuth, me } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const r = Router();

r.post("/signup", signup);
r.post("/verify-otp", verifyOtpController);
r.post("/google", googleAuth);
r.get("/me", authMiddleware, me);

export default r;
