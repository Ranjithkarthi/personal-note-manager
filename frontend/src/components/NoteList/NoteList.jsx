import React from 'react';
import './NoteList.css';

const NoteList = ({ notes, onEdit, onDelete }) => {
  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note._id} className="note-card">
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <p>Category: {note.category}</p>
          <button onClick={() => onEdit(note)}>Edit</button>
          <button onClick={() => onDelete(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
