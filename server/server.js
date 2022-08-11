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

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'src', 'views', 'game.html'));
});

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('placedToken', (token) => {
    console.log(token);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});