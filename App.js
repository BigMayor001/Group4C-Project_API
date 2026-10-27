require("dotenv") .config();

const dotenv =require('dotenv');
dotenv.config();
const express = require('express');
  
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

let notes = [
  { id: 1, title: 'Create', content: 'Welcome to Text Notea API' },
  { id: 2, title: 'Commit', content: 'Review and Submit project link' },

];
// 1. CREATE a new Task (POST)

app.post('/api/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }

  const newNote = {
    id: notes.length + 1,
    title,
    content,
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
    return res.status(404).json({ error: 'Title not found' });
  }
  res.json(note);
});

// 4. UPDATE a Task by ID
app.put('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId);
  if (!note) {
    return res.status(404).json({ error: 'Task not found' });
  }

  const { title, completed } = req.body;
  if (note)note.title = title;
  if (note)note.completed = completed;

  res.json(note);
 });

 // 5. DELETE a Task by ID
app.delete('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const noteIndex = notes.findIndex(n => n.id === noteId);
  if (noteIndex === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }

  notes.deleteNote = notes.splice(noteIndex, 1);
  res.json({ message: 'Note deleted successfully', note: notes.deleteNote[0] });
});


const port = process.env.PORT || 5000;
        app.listen(PORT, () => { 
        console.log(`App is running on http://localhost:${PORT}`); 
});  