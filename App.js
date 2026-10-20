require("dotenv") .config();

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
}


app.listen(PORT, () => { 
console.log(`App is running on http://localhost:${PORT}`); 
});
