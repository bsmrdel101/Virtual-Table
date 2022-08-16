let gamesList = [];
let gameFormOpen = false;
let gameNameInput;
let client;
let room;

document.addEventListener('DOMContentLoaded', () => {
    getGames();
    setGamesList();
});

function joinPlayer(roomCode, e) {
    e.preventDefault();
    room = roomCode;
    socket.emit('JOIN_ROOM', 'player', roomCode, (roomExists, newClient) => {
        if (roomExists) {
            client = newClient;
            gameScreen();
        } else {
            console.log('room doesn\'t exist');
        }
    });
}

function joinDM(roomCode) {
    room = roomCode;
    socket.emit('JOIN_ROOM', 'dm', roomCode, (roomExists, newClient) => {
        if (roomExists) {
            client = newClient;
            gameScreen();
        } else {
            console.log('game already started');
        }
    });
}

function setGamesList() {
    document.querySelector('.games-list__content').remove();

    const listContent = document.querySelector('.games-list').appendChild(document.createElement('div'));
    listContent.classList.add('games-list__content');

    const gamesListEl = document.querySelector('.games-list__content');
    for (let game of gamesList) {
        gamesListEl.insertAdjacentHTML('beforeend', `
            <div class="game-list__item" onclick="joinDM('${game.name}')">
                <p>${game.name}</p>
            </div>
        `);
    }

    gamesListEl.insertAdjacentHTML('beforeend', `
        <button class="games-list__button" onclick="addGameForm()">Create Campaign</button>
    `);    
}

function addGameForm() {
    gameFormOpen = !gameFormOpen;
    if (gameFormOpen) {
        document.querySelector('.games-list__content').insertAdjacentHTML('beforeend', `
            <form class="form--add-game" onsubmit="addGame({name: gameNameInput}, event)">
                <input placeholder="name" onchange="gameNameInput = event.target.value" required>
                <button class="button--submit">Submit</button>
            </form>
        `);
    } else {
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
                    <button onclick="zoomIn()">+</button>
                    <button onclick="zoomOut()">-</button>
                    <button onclick="togglePlayerList()">Show Players</button>
                    <a class="toolbar__leave-btn" onclick="leaveRoom()">Leave Game</a>
                </div>
                <div class="grid-container">
                    <table id="grid"></table>
                </div>
            </div>
        </section>
    `);
    gamePageLoaded();
}

function leaveRoom() {
    socket.emit('USER_DISCONNECT', room, socket.id);
    socket.disconnect();
    location.reload();
}