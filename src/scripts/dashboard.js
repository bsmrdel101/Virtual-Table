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
    socket.emit('joinRoom', 'player', roomCode, (newClient) => {
       client = newClient;
       gameScreen();
    });
}

function joinDM(roomCode) {
    room = roomCode;
    socket.emit('joinRoom', 'dm', roomCode, (newClient) => {
        client = newClient;
        gameScreen();
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
                    <a onclick="leaveRoom()">Leave Game</a>
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
    location.reload();
}