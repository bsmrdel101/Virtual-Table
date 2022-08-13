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

let tokens = [];
let selectedMap;

// Socket.io
io.on('connection', (socket) => {
  socket.on('USER_DISCONNECT', (room, id) => {
    let deleteList = [];
    let clientList = [];    
    const clients = io.sockets.adapter.rooms.get(room);
    for (const clientId of clients) {
      const clientSocket = io.sockets.sockets.get(clientId);
      clientList.push(clientSocket.data.nickname);
      deleteList.push(clientSocket.id);
    }

    for (const client of deleteList) {
      if (client === id) {
        clientList.splice(deleteList.indexOf(client), 1);
      }
    }
    io.to(room).emit('UPDATE_PLAYER_LIST', clientList);
  });

  // Makes the user join a room
  socket.on('JOIN_ROOM', (userType, room, cb) => {
    // Create client object
    const client = {
      id: socket.id,
      clientType: userType
    }

    // Check if room already exists
    if (io.sockets.adapter.rooms.has(room)) {
      if (userType !== 'dm'){
        // If user is a player, then join
        socket.join(room);
        cb(true, client);
      } else {
        cb(false, {});
      }
    } else if (userType === 'dm') {
      // If user is a dm, then create a room
      socket.join(room);
      cb(true, client);
    } else {
      cb(false, {});
    }
  });

  socket.on('SET_NAME', (name) => {
    socket.data.nickname = {nickname: name};
  });

  socket.on('UPDATE_PLAYER_LIST', (room) => {
    let clientList = [];
    const clients = io.sockets.adapter.rooms.get(room);
    for (const clientId of clients) {
      const clientSocket = io.sockets.sockets.get(clientId);
      clientList.push(clientSocket.data.nickname);
    }
    io.to(room).emit('UPDATE_PLAYER_LIST', clientList);
  });

  socket.on('PLACE_TOKEN', (cell, token, username, room) => {
    tokens.push({cell: cell, token: token, username: username});
    io.to(room).emit('PLACE_TOKEN', cell, token, username);
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