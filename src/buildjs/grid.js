"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoomOut = exports.zoomIn = exports.setupGrid = exports.gamePageLoaded = exports.cells = exports.root = void 0;
const token_1 = require("./token");
const utils_1 = require("./utils");
const dashboard_1 = require("./dashboard");
const token_menu_1 = require("./menus/token.menu");
const map_menu_1 = require("./menus/map.menu");
const users_route_1 = require("./routes/users.route");
const character_menu_1 = require("./menus/character.menu");
const dashboard_2 = require("./dashboard");
const creature_stats_1 = require("./creature-stats");
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)();
let canOpenStats = true;
let x = 0, y = 0;
exports.root = document.documentElement;
let user;
let playerList = [];
exports.cells = [];
let currentMap;
let playersListOpen = false;
let cellToDelete;
let canPlace = true;
async function gamePageLoaded() {
    user = await fetchUser();
    socket.emit('SET_NAME', user.username);
    socket.emit('UPDATE_PLAYER_LIST', dashboard_1.room);
    setupGrid(25, 25, false);
    if (user.new_user) {
        (0, token_menu_1.addDefaultTokens)();
        (0, map_menu_1.addDefaultMaps)();
        (0, users_route_1.changeNewUser)(false);
    }
    if (dashboard_2.client.clientType == 'dm') {
        setupSidebar('dm');
    }
    else {
        setupSidebar('player');
        (0, character_menu_1.toggleCharacterMenu)('characters');
    }
}
exports.gamePageLoaded = gamePageLoaded;
function setupGrid(width, height, clear) {
    let hasEvents = false;
    document.getElementById('grid').addEventListener("contextmenu", e => e.preventDefault());
    clear && clearMap();
    for (let a = 0; a < height - 2; a++) {
        // Create row
        let newRow = document.getElementById('grid').appendChild(document.createElement('tr'));
        // Create cell
        for (let b = 0; b < width; b++) {
            let newCell = newRow.appendChild(document.createElement('td'));
            newCell.classList.add('grid__cell');
            if (x > width - 1)
                x = 0;
            newCell.setAttribute('x', x.toString());
            newCell.setAttribute('y', y.toString());
            x++;
            // Fires when element is dragged over this grid cell
            newCell.addEventListener("dragover", (e) => {
                const token = document.querySelector('.token--dragging');
                if (!hasEvents)
                    (0, token_1.giveTokenEvents)(token);
                hasEvents = true;
                newCell.appendChild(token);
                token.classList.add('token');
                if (token.classList.contains('menu__item'))
                    cellToDelete = '';
                token.classList.remove('menu__item');
                token.classList.remove('menu__item--token');
                if (token.getAttribute('size'))
                    token.classList.add(token.getAttribute('size'));
            });
            newCell.addEventListener("mousedown", (e) => {
                if (e.which === 1) {
                    for (let i = 0; i < 4; i++) {
                        if (e.path[i].classList.contains('grid__cell')) {
                            cellToDelete = e.path[i];
                        }
                    }
                }
            });
            newCell.addEventListener("dragend", () => {
                const token = newCell.firstElementChild;
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
                        if (relative === 'null' || dashboard_2.client.clientType === 'player')
                            return;
                        if (canOpenStats) {
                            // TODO: Make a call that has custom as true.
                            (0, creature_stats_1.openCreatureStatsWindow)(relative, false);
                            canOpenStats = false;
                        }
                        else {
                            setTimeout(function () { canOpenStats = true; }, 100);
                        }
                    });
                    // Remove token at previous position
                    if (cellToDelete)
                        socket.emit('REMOVE_TOKEN', { x: parseInt(cellToDelete.getAttribute('x')), y: parseInt(cellToDelete.getAttribute('y')) }, dashboard_1.room);
                    // Place new token
                    const newToken = new Token(id, image, size, relative);
                    canPlace = false;
                    socket.emit('PLACE_TOKEN', { x: parseInt(newCell.getAttribute('x')), y: parseInt(newCell.getAttribute('y')) }, newToken, user.username, dashboard_1.room);
                    // Refresh token menu
                    (0, token_menu_1.resetTokenBodyData)();
                    canOpenStats = true;
                }
            });
            exports.cells.push(newCell);
        }
        y++;
    }
}
exports.setupGrid = setupGrid;
// Places token on board
function createToken(cell, newToken, username) {
    if (canPlace) {
        const token = cell.appendChild(document.createElement('img'));
        token.setAttribute('src', newToken.image);
        token.setAttribute('id', newToken.id);
        token.setAttribute('relative', newToken.relative);
        token.classList.add('token');
        token.classList.add(newToken.size);
        token.setAttribute('size', newToken.size);
        if (username)
            token.setAttribute('owner', username);
        (0, token_1.giveTokenEvents)(token);
        let relative = token.getAttribute('relative');
        token.addEventListener("dblclick", () => {
            if (relative === 'null' || dashboard_2.client.clientType === 'player')
                return;
            if (canOpenStats) {
                // TODO: Make a call that has custom as true.
                (0, creature_stats_1.openCreatureStatsWindow)(relative, false);
                canOpenStats = false;
            }
            else {
                setTimeout(function () { canOpenStats = true; }, 100);
            }
        });
    }
    else {
        canPlace = true;
    }
}
function zoomIn() {
    let zoomMin = 0.5, zoomMax = 10;
    let rs = getComputedStyle(exports.root);
    let zoomValue = parseInt(rs.getPropertyValue('--zoom'));
    exports.root.style.setProperty('--zoom', `${(0, utils_1.clamp)(zoomValue + 1, zoomMin, zoomMax)}rem`);
}
exports.zoomIn = zoomIn;
function zoomOut() {
    let zoomMin = 0.5, zoomMax = 10;
    let rs = getComputedStyle(exports.root);
    let zoomValue = parseInt(rs.getPropertyValue('--zoom'));
    exports.root.style.setProperty('--zoom', `${(0, utils_1.clamp)(zoomValue - 1, zoomMin, zoomMax)}rem`);
}
exports.zoomOut = zoomOut;
function clearMap() {
    x = 0;
    y = 0;
    document.getElementById('grid').innerHTML = '';
    exports.cells = [];
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
    }
    else {
        document.querySelector('.players-list').remove();
    }
}
async function fetchUser() {
    const user = await (0, users_route_1.getUser)();
    return user;
}
function setupSidebar(userType) {
    const sidebar = document.querySelector('.sidebar');
    if (userType === 'dm') {
        sidebar.insertAdjacentHTML('beforeend', `
            <button class="sidebar__btn sidebar__tokens btn--hover" onclick="toggleTokenMenu('tokens')">Tokens</button>
            <button class="sidebar__btn sidebar__maps btn--hover" onclick="toggleCreaturesWindow()">Creatures</button>
            <button class="sidebar__btn sidebar__maps btn--hover" onclick="toggleMapMenu('maps')">Maps</button>
        `);
    }
    else {
        sidebar.insertAdjacentHTML('beforeend', `
            <button class="sidebar__btn sidebar__characters btn--hover" onclick="toggleCharacterMenu('characters')">Characters</button>
            <button class="sidebar__btn sidebar__character-sheet btn--hover" onclick="toggleCharacterSheet()">Character Sheet</button>
        `);
    }
}
class Token {
    id;
    image;
    size;
    relative;
    constructor(id, image, size, relative) {
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
socket.on('PLACE_TOKEN', ((cell, token, username) => {
    const newCell = (0, utils_1.findCell)(cell.x, cell.y);
    createToken(newCell, token, username);
}));
socket.on('REMOVE_TOKEN', ((cell) => {
    const newCell = (0, utils_1.findCell)(cell.x, cell.y);
    newCell.innerHTML = '';
}));
