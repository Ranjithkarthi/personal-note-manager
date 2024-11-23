const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, default: 'Others' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Note', NoteSchema);
