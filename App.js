require("dotenv").config();

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let notes = [
  { id: 1, title: 'Welcome note', content: 'This is your first note.' },
  { id: 2, title: 'Grocery list', content: 'Buy milk, eggs, and bread.' },
];

app.get('/', (req, res) => {
  res.json({
    message: 'Group4C Notes API',
    endpoints: {
      'GET /notes': 'Retrieve all notes',
    },
  });
});

app.get('/notes', (req, res) => {
  res.status(200).json(notes);
});

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`);
});