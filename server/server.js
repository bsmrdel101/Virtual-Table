const express = require("express");
const app = express();
const path = require('path');

const bodyParser = require('body-parser');
require('dotenv').config();

const pool = require('./modules/pool');

app.use(express.static('src'));

// Routes
const userRouter = require('./routes/user.router');

app.use('/api/user', userRouter);

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Views
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'src', 'views', 'login.html'));
})

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'src', 'views', 'game.html'));
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});