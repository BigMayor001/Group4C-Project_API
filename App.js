require("dotenv") .config();

const dotenv =require('dotenv');
const express = require('express');
  
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3001; // default to 3001 when .env has no PORT

app.use(express.json());

let notes = [
  { id: 1, title: 'Create', content: 'Welcome to Text Notes API', author: 'Five Members' },
  { id: 2, title: 'Member', content: 'Get members to commit on repo', author: 'Five Members' },

];
let nextId = 3;//keeping IDs unique after deleting
// 1. CREATE a new Task (POST)

app.post('/api/notes', (req, res) => {
  const { title, content, author } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newNote = {
    id: nextId++,
    title,
    content,
    author: author || 'unknown',
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// 2. RETRIEVE all Tasks (GET All)

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// 3. RETRIEVE a single Task by ID (GET ONE)

app.get('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  res.json(note);
});

// 4. UPDATE a Task by ID (PUT)

app.put('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId);
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const { title, content } = req.body;
  if (!title && !content){
    return res.status(400).json({error: 'Provide a title or content to update'});
  }
  if (title)note.title = title;
  if (content)note.content = content;

  res.json(note);
 });

 // 5. DELETE a Task by ID (DELETE)

app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const noteIndex = notes.findIndex(n => n.id === noteId);
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  const deleteNote = notes.splice(noteIndex, 1)[0];
  res.json({ message: 'Note deleted successfully', note: deleteNote });
});


if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`App is running on http://localhost:${PORT}`);
  });
}

module.exports = app;