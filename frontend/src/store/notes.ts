import { create } from 'zustand';
import api from '../api/axios';

export interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

interface NotesState {
  notes: Note[];
  loading: boolean;
  error: string | null;
  fetchNotes: () => Promise<void>;
  addNote: (title: string, content: string) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

export const useNotesStore = create<NotesState>((set) => ({
  notes: [],
  loading: false,
  error: null,

  fetchNotes: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get('/notes');
      set({ notes: res.data.notes, loading: false });
    } catch (err) {
      set({ error: 'Failed to fetch notes.', loading: false });
      console.error(err);
    }
  },

  addNote: async (title, content) => {
    try {
      const res = await api.post('/notes', { title, content });
      set((state) => ({ notes: [res.data.note, ...state.notes] }));
    } catch (err) {
      set({ error: 'Failed to add note.' });
      console.error(err);
    }
  },

  deleteNote: async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      set((state) => ({ notes: state.notes.filter((note) => note._id !== id) }));
    } catch (err) {
      set({ error: 'Failed to delete note.' });
      console.error(err);
    }
  },
}));
