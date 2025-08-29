import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import notesRoutes from "./routes/notes.routes";

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes (empty for now, we’ll add them in Step 3)
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);

app.get("/", (_, res) => res.json({ ok: true, message: "Note App API running" }));

export default app;
