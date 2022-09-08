let x = 0, y = 0;
let root = document.documentElement;
let zoomMin = 12, zoomMax = 64;
let user;
let playerList = [];
let cells = [];
let currentMap;
let playersListOpen = false;
let cellToDelete;
let canPlace = true;
let lastPos;
let mousePos = {};

// This function is called after the DOM is loaded
async function gamePageLoaded() {
    user = await fetchUser();
    socket.emit('SET_NAME', user.username);
    socket.emit('UPDATE_PLAYER_LIST', room);
    setupGrid(25, 25);

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

function setupGrid(width, height) {
    const grid = document.querySelector('.grid');
    grid.style.setProperty('--grid-x', width);
    grid.style.setProperty('--grid-y', height);

    // Adding 1 to width and height, because grid starts at (1,1)
    createGridClickDetection(width + 1, height + 1, grid);

    let selectedCell;
    addGridEvents(grid, selectedCell);
}

// Add event handlers for the grid
function addGridEvents(grid, selectedCell) {
    // Fires whenever token is dragged over the grid
    // The last cell hovered over is the selected cell
    grid.addEventListener('dragover', (e) => {
        selectedCell = e.target;
    });

    document.addEventListener('dragend', () => {
        const relativeCell = findRelativeCell(selectedCell, mousePos.x, mousePos.y);
        addTokenToBoard(relativeCell || selectedCell);
    });
}

function addTokenEvents(token, relative) {
    // Open stats menu after double click
    token.addEventListener('dblclick', () => {
        if (!relative) return;
        openCreatureStatsWindow(relative);
    });
    // Handle dragging token
    token.addEventListener('dragstart', (e) => {
        const tokenPos = token.getBoundingClientRect();
        mousePos = {
            x: e.x - tokenPos.x,
            y: e.y - tokenPos.y
        };

        placeToken(e, parseInt(token.getAttribute('size')));
        const cell = token.parentNode;
        lastPos = {x: parseInt(cell.getAttribute('x')), y: parseInt(cell.getAttribute('y'))};
    });
    // Handle token moved
    token.addEventListener('dragend', () => {
        socket.emit('REMOVE_TOKEN', lastPos, room);
        const size = parseInt(token.getAttribute('size'));
        socket.emit('REMOVE_OCCUPIED_TOKEN_SPACE', lastPos.x, lastPos.y, size, room);
    });
}

function addTokenToBoard(selectedCell) {
    // Clone token being dragged from menu
    const menuToken = document.querySelector('.token--dragging');
    menuToken.classList.remove('token--dragging');

    if (!parseInt(selectedCell.getAttribute('x'))) {
        menuToken.classList.remove('menu__item');
        menuToken.classList.remove('menu__item--token');
        socketPlaceToken({x: lastPos.x, y: lastPos.y}, {img: menuToken.getAttribute('src'), relative: menuToken.getAttribute('relative'), id: parseInt(menuToken.id), size: parseInt(menuToken.getAttribute('size'))}, user.username, room);
    }

    if (!selectedCell.childNodes.length > 0) {
        menuToken.classList.remove('menu__item');
        menuToken.classList.remove('menu__item--token');
        socketPlaceToken({x: parseInt(selectedCell.getAttribute('x')), y: parseInt(selectedCell.getAttribute('y'))}, {img: menuToken.getAttribute('src'), relative: menuToken.getAttribute('relative'), id: parseInt(menuToken.id), size: parseInt(menuToken.getAttribute('size'))}, user.username, room);
    }
}

// Generates div's in each cell, with x and y coordinates
// The div's will detect where the user drops a token
function createGridClickDetection(width, height, grid) {
    resetBoard();
    for (let y = 1; y < height; y++) {
        for (let x = 1; x < width; x++) {
            grid.insertAdjacentHTML('beforeend', `
                <div class="grid__cell cell" x="${x}" y="${y}"></div>
            `);
        }
    }
}

// Clears the board and resets its click detection
function resetBoard() {
    document.querySelectorAll('.grid__cell').forEach((cell) => {
        cell.remove();
    });
    document.querySelectorAll('.token').forEach((token) => {
        token.remove();
    });
}

function zoomIn() {
    const grid = document.querySelector('.grid');
    let rs = getComputedStyle(grid);
    let zoomValue = parseInt(rs.getPropertyValue('--size'));
    grid.style.setProperty('--size', `${clamp(zoomValue + 8, zoomMin, zoomMax)}px`);
}

function zoomOut() {
    const grid = document.querySelector('.grid');
    let rs = getComputedStyle(grid);
    let zoomValue = parseInt(rs.getPropertyValue('--size'));
    grid.style.setProperty('--size', `${clamp(zoomValue - 8, zoomMin, zoomMax)}px`);
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

function setupSidebar(userType) {
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

// Occupy tiles that the token fills, if the token is bigger than 1 cell
function occupyTokenSpace(cellX, cellY, size) {
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const cell = findCell(cellX + x, cellY + y);
            cell.style.setProperty('background-color', 'var(--enemy-background)');
        }
    }
}

// Don't occupy tiles that the token fills, if the token is bigger than 1 cell
function removeOccupyTokenSpace(cellX, cellY, size) {
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            const cell = findCell(cellX + x, cellY + y);
            cell.style.removeProperty('background-color');
        }
    }
}

class Token {
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

function socketPlaceToken(coords, tokenData, username, room) {
    socket.emit('PLACE_TOKEN', coords, tokenData, username, room);
}

socket.on('UPDATE_PLAYER_LIST', ((clientList) => {
    playerList = [];
    for (let client of clientList) {
        playerList.push(client.nickname);
    }
    togglePlayerList();
    togglePlayerList();
}));

// Add a token to the board
socket.on('PLACE_TOKEN', ((selectedCell, menuToken, username) => {
    const { x, y } = selectedCell;
    const { img, relative, size } = menuToken;
    const token = document.createElement('img');
    const cell = findCell(x, y);
    token.classList.add('token');
    token.setAttribute('src', img);
    token.setAttribute('relative', relative)
    token.setAttribute('user', username);
    token.setAttribute('size', size);
    cell.appendChild(token);
    // Set token size
    token.style.setProperty('height', `calc(var(--size) * ${size})`);
    token.style.setProperty('width', `calc(var(--size) * ${size})`);
    // Set token position
    token.style.setProperty('--row', x);
    token.style.setProperty('--column', y);

    if (size > 1) {
        occupyTokenSpace(x, y, size);
    } else {
        cell.style.setProperty('background-color', 'var(--enemy-background)');
    }

    addTokenEvents(token, relative);
    resetTokenBodyData();
}));

// Removes the token background for everyone
socket.on('REMOVE_OCCUPIED_TOKEN_SPACE', (lastPosX, lastPosY, size) => {
    if (size > 1) {
        removeOccupyTokenSpace(lastPosX, lastPosY, size);
    } else {
        findCell(lastPosX, lastPosY).style.removeProperty('background-color');
    }
});

socket.on('REMOVE_TOKEN', ((cell) => {
    const newCell = findCell(cell.x, cell.y);
    newCell.innerHTML = '';
}));
