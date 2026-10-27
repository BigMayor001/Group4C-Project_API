require("dotenv").config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let notes = [
  { id: 1, title: 'Welcome note', content: 'This is your first note.' },
  { id: 2, title: 'Grocery list', content: 'Buy milk, eggs, and bread.' },
];

let nextId = notes.length + 1;

app.get('/', (req, res) => {
  res.json({
    message: 'Group4C Notes API',
    endpoints: {
      'GET /notes': 'Retrieve all notes',
      'GET /notes/:id': 'Retrieve a single note',
      'POST /notes': 'Create a new note',
      'PUT /notes/:id': 'Update an existing note',
      'DELETE /notes/:id': 'Delete a note',
    },
  });
});

app.get('/notes', (req, res) => {
  res.status(200).json(notes);
});

app.get('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (!note) {
    return res.status(404).json({ error: `Note with id ${id} not found` });
  }
  res.status(200).json(note);
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ error: 'title and content are required' });
  }
  const note = { id: nextId++, title, content };
  notes.push(note);
  res.status(201).json(note);
});

app.put('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (!note) {
    return res.status(404).json({ error: `Note with id ${id} not found` });
  }
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ error: 'title and content are required' });
  }
  note.title = title;
  note.content = content;
  res.status(200).json(note);
});

app.delete('/notes/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) {
    return res.status(404).json({ error: `Note with id ${id} not found` });
  }
  notes.splice(index, 1);
  res.status(204).send();
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong on the server' });
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
