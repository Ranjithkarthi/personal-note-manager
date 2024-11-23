const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/', async (req, res) => {
  const { category, search } = req.query;
  const filter = {};
  if (category) filter.category = category;
  if (search) filter.title = new RegExp(search, 'i');
  const notes = await Note.find(filter).sort({ createdAt: -1 });
  res.json(notes);
});

router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(note);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
    try {
      const note = await Note.findByIdAndDelete(req.params.id);
      if (!note) {
        return res.status(404).json({ message: 'Note not found' });
      }
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

module.exports = router;
