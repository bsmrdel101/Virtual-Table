"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setGamesList = exports.setupGame = exports.room = exports.client = exports.gamesList = void 0;
const dashboard_route_1 = require("./routes/dashboard.route");
const creatures_route_1 = require("./routes/creatures.route");
const grid_1 = require("./grid");
exports.gamesList = { value: [] };
let gameFormOpen = false;
let gameNameInput;
let prevGame;
let roomCode;
async function setupGame() {
    (0, dashboard_route_1.getGames)();
    prevGame = await (0, dashboard_route_1.getPrevGame)();
    roomCode = prevGame.code;
    document.getElementById('room-code-input').value = prevGame.code;
    // Get D&D api data
    (0, creatures_route_1.getCreatures)();
}
exports.setupGame = setupGame;
function joinPlayer(roomCode, e) {
    e.preventDefault();
    exports.room = roomCode;
    socket.emit('JOIN_ROOM', 'player', roomCode, (roomExists, newClient) => {
        if (roomExists) {
            exports.client = newClient;
            gameScreen();
            (0, dashboard_route_1.addPrevGame)({ game: roomCode });
            socket.emit('FETCH_BOARD');
        }
        else {
            console.log('room doesn\'t exist');
        }
    });
}
function joinDM(roomCode) {
    exports.room = roomCode;
    socket.emit('JOIN_ROOM', 'dm', roomCode, (roomExists, newClient) => {
        if (roomExists) {
            exports.client = newClient;
            gameScreen();
        }
        else {
            console.log('game already started');
        }
    });
}
function setGamesList() {
    document.querySelector('.games-list__content').remove();
    const listContent = document.querySelector('.games-list').appendChild(document.createElement('div'));
    listContent.classList.add('games-list__content');
    const gamesListEl = document.querySelector('.games-list__content');
    for (let game of exports.gamesList.value) {
        gamesListEl.insertAdjacentHTML('beforeend', `
            <div class="game-list__item" onclick="joinDM('${game.code}')">
                <p>${game.name}</p>
            </div>
        `);
    }
    gamesListEl.insertAdjacentHTML('beforeend', `
        <button class="games-list__button btn--hover" onclick="addGameForm()">Create Campaign</button>
    `);
}
exports.setGamesList = setGamesList;
function addGameForm() {
    gameFormOpen = !gameFormOpen;
    if (gameFormOpen) {
        document.querySelector('.games-list__content').insertAdjacentHTML('beforeend', `
            <form class="form--add-game" onsubmit="addGame({name: gameNameInput}, event)">
                <input placeholder="name" onchange="gameNameInput = event.target.value" required>
                <button class="button--submit btn--hover">Submit</button>
            </form>
        `);
    }
    else {
        document.querySelector('.form--add-game').remove();
    }
}
function gameScreen() {
    document.querySelector('.dashboard-page-container').remove();
    document.querySelector('.page-container').insertAdjacentHTML('beforeend', `
        <section class="game-page-container">
            <div class="sidebar"></div>
            <div class="game-content">
                <div class="toolbar">
                    <button class="toolbar__btn" onclick="zoomIn()">+</button>
                    <button class="toolbar__btn" onclick="zoomOut()">-</button>
                    <button class="toolbar__btn" onclick="togglePlayerList()">Show Players</button>
                    <p class="toolbar__text">Room: ${exports.room}</p>
                    <a class="toolbar__leave-btn" onclick="leaveRoom()">Leave Game</a>
                </div>
                <div class="grid-container">
                    <table id="grid"></table>
                </div>
            </div>
        </section>
    `);
    (0, grid_1.gamePageLoaded)();
}
function leaveRoom() {
    socket.emit('USER_DISCONNECT', exports.room, socket.id);
    socket.disconnect();
    location.reload();
}
