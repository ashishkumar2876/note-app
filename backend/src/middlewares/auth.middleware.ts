import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export async function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ ok: false, message: "No token provided" });

  const token = header.split(" ")[1];
  try {
    const secret = process.env.JWT_SECRET || "secret";
    const payload: any = jwt.verify(token, secret);

    const user = await User.findById(payload.id).lean();
    if (!user) return res.status(401).json({ ok: false, message: "Invalid token" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, message: "Invalid token" });
  }
}
