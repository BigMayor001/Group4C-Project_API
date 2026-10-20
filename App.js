require("dotenv") .config();

const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT;

app.use(express.json());


app.listen(PORT, () => { 
console.log(`App is running on http://localhost:${PORT}`); 
});
