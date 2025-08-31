import { Request, Response } from "express";
import jwt, {SignOptions} from "jsonwebtoken";
import User from "../models/user.model";
import { generateOtp, verifyOtp } from "../utils/otp.util";
import { OAuth2Client } from "google-auth-library";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function signToken(userId: string) {
  const secret = process.env.JWT_SECRET || "secret";
  const expiresIn = 60 * 60 * 24 * 7;
  return jwt.sign({ id: userId }, secret, {expiresIn});
}

// Step 1: Signup with Email (generate OTP)
export async function signup(req: Request, res: Response) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ ok: false, message: "Email required" });

  generateOtp(email);
  return res.json({ ok: true, message: "OTP sent (check server console in dev)" });
}

// Step 2: Verify OTP
export async function verifyOtpController(req: Request, res: Response) {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).json({ ok: false, message: "Email & OTP required" });

  if (!verifyOtp(email, otp)) return res.status(400).json({ ok: false, message: "Invalid or expired OTP" });

  let user = await User.findOne({ email });
  if (!user) user = await User.create({ email });

  const token = signToken(user._id.toString());
  return res.json({ ok: true, token, user });
}

// Step 3: Google Login
export async function googleAuth(req: Request, res: Response) {
  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ ok: false, message: "idToken required" });

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID
    });

    const payload = ticket.getPayload();
    const email = payload?.email;
    const googleId = payload?.sub;
    const name = payload?.name;

    if (!email || !googleId) return res.status(400).json({ ok: false, message: "Invalid Google token" });

    let user = await User.findOne({ email });
    if (!user) user = await User.create({ email, googleId, name });

    const token = signToken(user._id.toString());
    return res.json({ ok: true, token, user });
  } catch (err) {
    return res.status(400).json({ ok: false, message: "Google token verification failed" });
  }
}

// Step 4: Me endpoint
export async function me(req: Request, res: Response) {
  return res.json({ ok: true, user: req.user });
}
