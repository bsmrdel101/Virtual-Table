let gamesList: any = [];
let gameFormOpen: boolean = false;
let gameNameInput: string;
export let client: any;
export let room: any;
let prevGame: any;

document.addEventListener('DOMContentLoaded', async () => {
    getGames();
    prevGame = await getPrevGame();
    roomCode = prevGame.code;
    document.getElementById('room-code-input').value = prevGame.code;
    // Get D&D api data
    getCreatures();
});

function joinPlayer(roomCode, e) {
    e.preventDefault();
    room = roomCode;

    socket.emit('JOIN_ROOM', 'player', roomCode, (roomExists, newClient) => {
        if (roomExists) {
            client = newClient;
            gameScreen();
            addPrevGame({game: roomCode});
            socket.emit('FETCH_BOARD');
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
            <div class="game-list__item" onclick="joinDM('${game.code}')">
                <p>${game.name}</p>
            </div>
        `);
    }

    gamesListEl.insertAdjacentHTML('beforeend', `
        <button class="games-list__button btn--hover" onclick="addGameForm()">Create Campaign</button>
    `);    
}

function addGameForm() {
    gameFormOpen = !gameFormOpen;
    if (gameFormOpen) {
        document.querySelector('.games-list__content').insertAdjacentHTML('beforeend', `
            <form class="form--add-game" onsubmit="addGame({name: gameNameInput}, event)">
                <input placeholder="name" onchange="gameNameInput = event.target.value" required>
                <button class="button--submit btn--hover">Submit</button>
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
                    <button class="toolbar__btn" onclick="zoomIn()">+</button>
                    <button class="toolbar__btn" onclick="zoomOut()">-</button>
                    <button class="toolbar__btn" onclick="togglePlayerList()">Show Players</button>
                    <p class="toolbar__text">Room: ${room}</p>
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