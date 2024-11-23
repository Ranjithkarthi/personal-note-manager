import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList/NoteList';
import NoteForm from './components/NoteForm/NoteForm';
import SearchBar from './components/SearchBar/SearchBar';
import './App.css';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [filteredNotes, setFilteredNotes] = useState([]);
  const [editNote, setEditNote] = useState(null);

  const fetchNotes = async () => {
    const response = await axios.get('http://localhost:5000/notes');
    setNotes(response.data);
    setFilteredNotes(response.data);
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const addOrEditNote = async (note) => {
    if (editNote) {
      // Edit existing note
      await axios.put(`http://localhost:5000/notes/${editNote._id}`, note);
    } else {
      // Add new note
      await axios.post('http://localhost:5000/notes', note);
    }
    setEditNote(null); // Reset editNote after submitting
    fetchNotes(); // Re-fetch the updated notes list
  };
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/notes/${id}`);
      fetchNotes();
    } catch (error) {
      console.error("Error deleting the note:", error);
    }
  };
  

  const handleSearch = (query) => {
    setFilteredNotes(
      notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.category.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  return (
    <div className="app-container">
      <SearchBar className="search-bar" onSearch={handleSearch} onFilter={(cat) => handleSearch(cat)} />
      <NoteForm className="note-form" onSubmit={addOrEditNote} initialData={editNote} />
      <NoteList
        className="note-list"
        notes={filteredNotes}
        onEdit={(note) => setEditNote(note)}
        onDelete={deleteNote}
      />
    </div>
  );
};

export default App;
