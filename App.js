require('dotenv').config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory store (resets when the server restarts)
let notes = [];
let nextId = 1;

// Checks that title and content are non-empty strings.
// On update (partial = true) fields may be omitted, but not blank.
function validateNote(body, partial = false) {
  const errors = [];
  for (const field of ['title', 'content']) {
    const value = body[field];
    if (value === undefined) {
      if (!partial) errors.push(`${field} is required`);
    } else if (typeof value !== 'string' || value.trim() === '') {
      errors.push(`${field} must be a non-empty string`);
    }
  }
  if (partial && body.title === undefined && body.content === undefined) {
    errors.push('Provide title and/or content to update');
  }
  return errors;
}

function findNote(req, res) {
  const id = Number(req.params.id);
  const note = notes.find((n) => n.id === id);
  if (!note) {
    res.status(404).json({ error: `Note with id ${req.params.id} not found` });
  }
  return note;
}

app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Group 4C Notes API',
    endpoints: {
      'POST /notes': 'Create a new note',
      'GET /notes': 'Get all notes',
      'GET /notes/:id': 'Get one note by ID',
      'PUT /notes/:id': 'Update a note',
      'DELETE /notes/:id': 'Delete a note',
    },
  });
});

app.post('/notes', (req, res) => {
  const body = req.body || {};
  const errors = validateNote(body);
  if (errors.length) return res.status(400).json({ errors });

  const note = { id: nextId++, title: body.title.trim(), content: body.content.trim() };
  notes.push(note);
  res.status(201).json(note);
});

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.get('/notes/:id', (req, res) => {
  const note = findNote(req, res);
  if (note) res.json(note);
});

app.put('/notes/:id', (req, res) => {
  const note = findNote(req, res);
  if (!note) return;

  const body = req.body || {};
  const errors = validateNote(body, true);
  if (errors.length) return res.status(400).json({ errors });

  if (body.title !== undefined) note.title = body.title.trim();
  if (body.content !== undefined) note.content = body.content.trim();
  res.json(note);
});

app.delete('/notes/:id', (req, res) => {
  const note = findNote(req, res);
  if (!note) return;

  notes = notes.filter((n) => n.id !== note.id);
  res.json({ message: 'Note deleted', note });
});

// Unknown routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Malformed JSON and other errors
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON in request body' });
  }
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});
