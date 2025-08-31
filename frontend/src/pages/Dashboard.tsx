import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../store/auth';
import { useNotesStore } from '../store/notes';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { notes, loading, error, fetchNotes, addNote, deleteNote } = useNotesStore();
  const { token, logout } = useAuthStore();
  const navigate = useNavigate();

  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteContent, setNewNoteContent] = useState('');

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      fetchNotes();
    }
  }, [token, navigate, fetchNotes]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newNoteTitle.trim()) {
      await addNote(newNoteTitle, newNoteContent);
      setNewNoteTitle('');
      setNewNoteContent('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 font-sans">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Notes</h1>
        <button
          onClick={handleLogout}
          className="py-2 px-4 rounded-md bg-red-500 text-white font-medium shadow-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </header>

      {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}

      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Create New Note</h2>
        <form onSubmit={handleAddNote}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
            <input
              type="text"
              id="title"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-sm font-medium text-gray-600">Content</label>
            <textarea
              id="content"
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 transition-colors"
            disabled={loading}
          >
            {loading ? 'Adding Note...' : 'Add Note'}
          </button>
        </form>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-gray-800">Your Notes</h2>
      {loading && <p className="text-center text-gray-600">Loading notes...</p>}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {notes.length === 0 && !loading ? (
          <p className="text-center text-gray-500 col-span-full">You don't have any notes yet. Create one above!</p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{note.title}</h3>
                <p className="text-gray-600 mb-4">{note.content}</p>
              </div>
              <div className="flex justify-between items-center text-sm text-gray-400">
                <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                <button
                  onClick={() => deleteNote(note._id)}
                  className="py-1 px-3 text-sm rounded-md bg-red-400 text-white hover:bg-red-500 transition-colors"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
