import { giveTokenEvents } from './token';
import { clamp, findCell } from './utils';
import { room } from './dashboard';
import { addDefaultTokens, resetTokenBodyData } from './menus/token.menu';
import { addDefaultMaps } from './menus/map.menu';
import { changeNewUser, getUser } from './routes/users.route';
import { toggleCharacterMenu } from './menus/character.menu';
import { client } from './dashboard';
import { openCreatureStatsWindow } from './creature-stats';
import { io, Socket } from "socket.io-client";

const socket: Socket = io();
let canOpenStats: boolean = true;
let x: number = 0, y: number = 0;
export let root: any = document.documentElement;
let user: any;
let playerList: any = [];
export let cells: any = [];
let playersListOpen: boolean = false;
let cellToDelete: any;
let canPlace: boolean = true;


export async function gamePageLoaded() {
    user = await fetchUser();
    socket.emit('SET_NAME', user.username);
    socket.emit('UPDATE_PLAYER_LIST', room);
    setupGrid(25, 25, false);

    if (user.new_user) {
        addDefaultTokens();
        addDefaultMaps();
        changeNewUser(false);
    }

    if (client.clientType == 'dm') {
        setupSidebar('dm');
    } else {
        setupSidebar('player');
        toggleCharacterMenu('characters');
    }
}

export function setupGrid(width: number, height: number, clear: boolean) {
    let hasEvents: boolean = false;

    document.getElementById('grid').addEventListener("contextmenu", e => e.preventDefault());
    clear && clearMap();

    for (let a = 0; a < height - 2; a++) {
        // Create row
        let newRow = document.getElementById('grid').appendChild(document.createElement('tr'));

        // Create cell
        for (let b = 0; b < width; b++) {
            let newCell = newRow.appendChild(document.createElement('td'));
            newCell.classList.add('grid__cell');
            if (x > width - 1) x = 0;

            newCell.setAttribute('x', x.toString());
            newCell.setAttribute('y', y.toString());
            x++;

            // Fires when element is dragged over this grid cell
            newCell.addEventListener("dragover", (e: Event) => {
                const token = document.querySelector('.token--dragging');
                if (!hasEvents) giveTokenEvents(token);
                hasEvents = true;
                newCell.appendChild(token);
                token.classList.add('token');
                if (token.classList.contains('menu__item')) cellToDelete = '';
                token.classList.remove('menu__item');
                token.classList.remove('menu__item--token');
                if (token.getAttribute('size')) token.classList.add(token.getAttribute('size'));    
            });
            newCell.addEventListener("mousedown", (e: any) => {
                if (e.which === 1) {
                    for (let i = 0; i < 4; i++) {
                        if (e.path[i].classList.contains('grid__cell')) {
                            cellToDelete = e.path[i];
                        }
                    }
                }
            });
            newCell.addEventListener("dragend", () => {
                const token: Element = newCell.firstElementChild;
                if (token) {
                    let size = token.getAttribute('size');
                    let image = token.getAttribute('src');
                    let relative = token.getAttribute('relative'); 
                    let id = token.getAttribute('id');
                    // Set token
                    token.classList.remove('token--dragging');
                    token.removeAttribute('onmousedown');
                    // Open stats menu after double click
                    token.addEventListener("dblclick", () => {
                        if (relative === 'null' || client.clientType === 'player') return;

                        if (canOpenStats) {
                            // TODO: Make a call that has custom as true.
                            openCreatureStatsWindow(relative, false); 
                            canOpenStats = false;
                        } else {
                            setTimeout(function() { canOpenStats = true; }, 100);
                        }
                    });
                    // Remove token at previous position
                    if (cellToDelete) socket.emit('REMOVE_TOKEN', {x: parseInt(cellToDelete.getAttribute('x')), y: parseInt(cellToDelete.getAttribute('y'))}, room);

                    // Place new token
                    const newToken = new Token(id, image, size, relative);
                    canPlace = false;
                    socket.emit('PLACE_TOKEN', {x: parseInt(newCell.getAttribute('x')), y: parseInt(newCell.getAttribute('y'))}, newToken, user.username, room);
                    // Refresh token menu
                    resetTokenBodyData();
                    canOpenStats = true;
                }
            });

            cells.push(newCell);
        }
        y++;
    }
}

// Places token on board
function createToken(cell: any, newToken: any, username: string) {
    if (canPlace) {
        const token = cell.appendChild(document.createElement('img'));
        token.setAttribute('src', newToken.image);
        token.setAttribute('id', newToken.id);
        token.setAttribute('relative', newToken.relative);
        token.classList.add('token');
        token.classList.add(newToken.size);
        token.setAttribute('size', newToken.size);
        if (username) token.setAttribute('owner', username);
        giveTokenEvents(token);

        let relative = token.getAttribute('relative');
        token.addEventListener("dblclick", () => {
            if (relative === 'null' || client.clientType === 'player') return;

            if (canOpenStats) {
                // TODO: Make a call that has custom as true.
                openCreatureStatsWindow(relative, false);
                canOpenStats = false;
            } else {
                setTimeout(function() { canOpenStats = true; }, 100);
            }
        });
    } else {
        canPlace = true;
    }
}

export function zoomIn() {
    let zoomMin: number = 0.5, zoomMax: number = 10;
    let rs = getComputedStyle(root);
    let zoomValue = parseInt(rs.getPropertyValue('--zoom'));
    root.style.setProperty('--zoom', `${clamp(zoomValue + 1, zoomMin, zoomMax)}rem`);
}

export function zoomOut() {
    let zoomMin: number = 0.5, zoomMax: number = 10;
    let rs = getComputedStyle(root);
    let zoomValue = parseInt(rs.getPropertyValue('--zoom'));
    root.style.setProperty('--zoom', `${clamp(zoomValue - 1, zoomMin, zoomMax)}rem`);
}

function clearMap() {
    x = 0;
    y = 0;
    document.getElementById('grid').innerHTML = '';
    cells = [];
}

function togglePlayerList() {
    playersListOpen = !playersListOpen;
    if (playersListOpen) {
        const playerListContainer = document.querySelector('body').appendChild(document.createElement('div'));
        playerListContainer.classList.add('players-list');
    
        const playerListEl = document.querySelector('.players-list');
        for (let player of playerList) {
            playerListEl.insertAdjacentHTML('beforeend', `
                <p>${player}</p>
            `);
        }
    } else {
        document.querySelector('.players-list').remove();
    }
}

async function fetchUser() {
    const user = await getUser();
    return user;
}

function setupSidebar(userType: string) {
    const sidebar = document.querySelector('.sidebar');
    if (userType === 'dm') {
        sidebar.insertAdjacentHTML('beforeend', `
            <button class="sidebar__btn sidebar__tokens btn--hover" onclick="toggleTokenMenu('tokens')">Tokens</button>
            <button class="sidebar__btn sidebar__maps btn--hover" onclick="toggleCreaturesWindow()">Creatures</button>
            <button class="sidebar__btn sidebar__maps btn--hover" onclick="toggleMapMenu('maps')">Maps</button>
        `);
    } else {
        sidebar.insertAdjacentHTML('beforeend', `
            <button class="sidebar__btn sidebar__characters btn--hover" onclick="toggleCharacterMenu('characters')">Characters</button>
            <button class="sidebar__btn sidebar__character-sheet btn--hover" onclick="toggleCharacterSheet()">Character Sheet</button>
        `);
    }
}

class Token {
    id: string;
    image: string;
    size: string;
    relative: any;
    constructor(id: string, image: string, size: string, relative: any) {
        this.id = id;
        this.image = image;
        this.size = size;
        this.relative = relative;
    }
}

// =================== //
//      SOCKET.IO      //
// =================== //

socket.on('UPDATE_PLAYER_LIST', ((clientList) => {
    playerList = [];
    for (let client of clientList) {
        playerList.push(client.nickname);
    }
    togglePlayerList();
    togglePlayerList();
}));

socket.on('PLACE_TOKEN', ((cell: any, token: Element, username: string) => {
    const newCell = findCell(cell.x, cell.y);
    createToken(newCell, token, username);
}));

socket.on('REMOVE_TOKEN', ((cell: any) => {
    const newCell = findCell(cell.x, cell.y);
    newCell.innerHTML = '';
}));

