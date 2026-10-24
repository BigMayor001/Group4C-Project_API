require("dotenv") .config();

const dotenv =require('dotenv');
dotenv.config();
const express = require('express');
  
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

let notes = [
  { id: 1, title: 'Plan the project milestones', completed: true },
  { id: 2, title: 'Gather requirements from the team', completed: true },
  { id: 3, title: 'Create the project design', completed: false },
  { id: 4, title: 'Set up the development environment', completed: false },
  { id: 5, title: 'Build the main page', completed: true },
  { id: 6, title: 'Add the required features', completed: false },
  { id: 7, title: 'Test the application', completed: false },
  { id: 8, title: 'Fix issues found during testing', completed: false },
  { id: 9, title: 'Review the code with the team', completed: true },
  { id: 10, title: 'Prepare the project for deployment', completed: false },
];
// 1. CREATE a new Task
app.post('/api/notes', (req, res) => {
  const { title, completed } = req.body;
  if (!title || !completed) {
    return res.status(400).json({ error: 'Title and completion status are required' });
  }

  const newNote = {
    id: notes.length + 1,
    title,
    completed,
  };

  notes.push(newNote);
  res.status(201).json(newNote);
});

// 2. RETRIEVE all Tasks
app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// 3. RETRIEVE a single Task by ID
app.get('/api/notes/:id', (req, res) => {
  const noteId = parseInt(req.params.id);
  const note = notes.find(n => n.id === noteId);
  if (!note) {
    return res.status(404).json({ error: 'Task not found' });
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