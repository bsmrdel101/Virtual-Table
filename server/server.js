const express = require("express");
const app = express();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Passport Session Configuration
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
const userRouter = require('./routes/user.router');
const tokensRouter = require('./routes/tokens.router');
const mapsRouter = require('./routes/maps.router');

app.use('/api/user', userRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/maps', mapsRouter);


app.use(express.static('src'));

// Views
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'src', 'views', 'login.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'src', 'views', 'register.html'));
});

app.get('/dashboard', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'src', 'views', 'dashboard.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'src', 'views', 'game.html'));
});

let tokens = [];
let selectedMap = [];
// Socket.io
io.on('connection', async (socket) => {
  console.log('a user connected');
  socket.on('populateData', () => {
    // Set selected map to default map, if there is no selected map
    if (selectedMap.length === 0) selectedMap = [{e: {width: 25, height: 25}}, {map: {id: 1, name: 'Default Map', image: 'https://images.squarespace-cdn.com/content/v1/5511fc7ce4b0a3782aa9418b/1429139759127-KFHWAFFFVXJWZNWTITKK/learning-the-grid-method.jpg'}}];
    socket.emit('populateData', tokens, selectedMap);
  });
  
  socket.on('placedToken', (cell, token, username) => {
    tokens.push({cell: cell, token: token, username: username});
    io.emit('placedToken', cell, token, username);
  });

  socket.on('selectMap', (e, map) => {
    selectedMap = [{e}, {map}];
    io.emit('selectMap', e, map);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('=======================');
});