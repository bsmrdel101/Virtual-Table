const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

// app.get('/', (req, res) => {
//     res.sendFile('/Users/bennett/Documents/Apprenticeship/Virtual-Table/src/views/game.html');
// });

app.use(express.static('src'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'login.html'));
})

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'game.html'));
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});