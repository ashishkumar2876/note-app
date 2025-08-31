import { Router } from "express";
import { createNote, listNotes, deleteNote } from "../controllers/notes.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const r = Router();

r.use(authMiddleware);
r.post("/", createNote);
r.get("/", listNotes);
r.delete("/:id", deleteNote);

export default r;
