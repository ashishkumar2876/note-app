import React, { useState } from 'react';
import { useNotesStore } from '../store/notes';

const NoteForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const addNote = useNotesStore((state) => state.addNote);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    setLoading(true);
    await addNote(title, content);
    setTitle('');
    setContent('');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white rounded-lg shadow-md mb-6">
      <h3 className="text-xl font-semibold mb-3">Create New Note</h3>
      <input
        type="text"
        className="w-full p-2 mb-2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        className="w-full p-2 mb-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 resize-none"
        placeholder="Note Content (Optional)"
        rows={4}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button
        type="submit"
        className="w-full py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        disabled={loading}
      >
        {loading ? 'Adding...' : 'Add Note'}
      </button>
    </form>
  );
};

export default NoteForm;
