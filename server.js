const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ankieta', { useNewUrlParser: true, useUnifiedTopology: true });

// Define a schema
const resultSchema = new mongoose.Schema({
    name: String,
    choice: String,
    points: Number
});

const Result = mongoose.model('Result', resultSchema);

// Routes
app.post('/results', async (req, res) => {
    const { name, choice, points } = req.body;
    const newResult = new Result({ name, choice, points });
    await newResult.save();
    res.send('Result saved!');
});

app.get('/results', async (req, res) => {
    const results = await Result.find();
    res.json(results);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
