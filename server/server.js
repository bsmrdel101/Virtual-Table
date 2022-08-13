const express = require("express");
const app = express();
const http = require('http');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();
const fileUpload = require('express-fileupload');

const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(fileUpload());

// Passport Session Configuration
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
const userRouter = require('./routes/user.router');
const tokensRouter = require('./routes/tokens.router');
const mapsRouter = require('./routes/maps.router');
const dashboardRouter = require('./routes/dashboard.router');
const characterRouter = require('./routes/character.router');

app.use('/api/user', userRouter);
app.use('/api/tokens', tokensRouter);
app.use('/api/maps', mapsRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/characters', characterRouter);


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

let playerList = [];
let clientList = [];
let tokens = [];
let selectedMap = [];

// Socket.io
io.on('connection', async (socket) => {
  // User disconnect
  socket.on('disconnect', () => {
    for (let client of clientList) {
      if (socket.id === client.id) {
        const i = clientList.indexOf(client);
        clientList.splice(i, 1);
        playerList.splice(i, 1);
        io.emit('userLeft', playerList);
      }
    }
  });

  // Makes the user join a room
  socket.on('joinRoom', (userType, room, cb) => {
    socket.join(room);
    const client = {
      id: socket.id,
      clientType: userType
    }
    clientList.push(client);
    cb(client);
  });

  // Runs after user has joined the game
  socket.on('userJoined', (name) => {
    playerList.push(name);
    io.emit('userJoined', playerList);
  });

  socket.on('placedToken', (cell, token, username, room) => {
    tokens.push({cell: cell, token: token, username: username});
    io.to(room).emit('placedToken', cell, token, username);
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