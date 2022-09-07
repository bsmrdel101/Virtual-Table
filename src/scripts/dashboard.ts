import { getGames, getPrevGame, addPrevGame } from "./routes/dashboard.route.js";
import { getCreatures } from "./routes/creatures.route.js";
import { gamePageLoaded } from "./grid.js";
import { io, Socket } from "socket.io-client";

const socket: Socket = io();
export let gamesList: any = { value: [] };
let gameFormOpen: boolean = false;
let gameNameInput: string;
export let client: any;
export let room: any;
let prevGame: any;
let roomCode: string;


export async function setupGame() {
    getGames();
    prevGame = await getPrevGame();
    roomCode = prevGame.code;
    (<HTMLInputElement>document.getElementById('room-code-input')).value = prevGame.code;
    // Get D&D api data
    getCreatures();
}

function joinPlayer(roomCode: string, e: Event) {
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

// Detects if user has clicked the join room button, to join as a player
document.getElementById('join-player-btn').addEventListener('click', (e: any) => {
    e.preventDefault();
    joinPlayer(roomCode, e);
});

function joinDM(roomCode: string) {
    room = roomCode;
    socket.emit('JOIN_ROOM', 'dm', roomCode, (roomExists: boolean, newClient: any) => {
        if (roomExists) {
            client = newClient;
            gameScreen();
        } else {
            console.log('game already started');
        }
    });
}

export function setGamesList() {
    document.querySelector('.games-list__content').remove();

    const listContent = document.querySelector('.games-list').appendChild(document.createElement('div'));
    listContent.classList.add('games-list__content');

    const gamesListEl = document.querySelector('.games-list__content');
    for (let game of gamesList.value) {
        gamesListEl.insertAdjacentHTML('beforeend', `
            <button class="game-list__item" room-code='${game.code}'>${game.name}</button>
        `);
    }

    gamesListEl.insertAdjacentHTML('beforeend', `
        <button class="games-list__button btn--hover" onclick="addGameForm()">Create Campaign</button>
    `);    
}

// Detects if user has clicked on a campaign, to join as a DM
document.addEventListener('click', (e: any) => {
    if (e.target.matches('.game-list__item')) {
        const target = e.target;
        joinDM(target.getAttribute('room-code'));
    }
});

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
