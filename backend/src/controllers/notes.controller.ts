import { Request, Response } from "express";
import Note from "../models/note.model";

export async function createNote(req: Request, res: Response) {
  const { title, content } = req.body;
  if (!title) return res.status(400).json({ ok: false, message: "Title required" });

  const note = await Note.create({ user: req.user._id, title, content });
  return res.json({ ok: true, note });
}

export async function listNotes(req: Request, res: Response) {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
  return res.json({ ok: true, notes });
}

export async function deleteNote(req: Request, res: Response) {
  const id = req.params.id;
  const note = await Note.findOneAndDelete({ _id: id, user: req.user._id });
  if (!note) return res.status(404).json({ ok: false, message: "Note not found" });

  return res.json({ ok: true });
}
