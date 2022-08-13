let x = 0; 
let y = 0;
let root = document.documentElement;
let zoomMin = 0.5;
let zoomMax = 10;
let user;
let playerList = [];
let cells = [];
let currentMap;
let playersListOpen = false;

async function gamePageLoaded() {
    user = await fetchUser();
    socket.emit('SET_NAME', user.username);
    socket.emit('UPDATE_PLAYER_LIST', room);

    // await socket.emit('userJoined', user.username, room);
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

function setupGrid(width, height, clear) {
    document.getElementById('grid').addEventListener("contextmenu", e => e.preventDefault());
    clear && clearMap();

    for (let a = 0; a < height - 2; a++) {
        // Create row
        let newRow = document.getElementById('grid').appendChild(document.createElement('tr'));

        // Create cell
        for (let b = 0; b < width; b++) {
            let newCell = newRow.appendChild(document.createElement('td'));
            newCell.classList.add('grid__cell');
            if (x > width - 1) x = 0

            newCell.setAttribute('x', x);
            newCell.setAttribute('y', y);
            x++;

            // Fires when element is dragged over this grid cell
            newCell.addEventListener("dragover", (e) => {
                const token = document.querySelector('.token--dragging');
                newCell.appendChild(token);
                token.classList.add('token');
                token.classList.remove('menu__item');
                token.classList.remove('menu__item--token');
                if (token.getAttribute('size')) token.classList.add(token.getAttribute('size'));
            });
            newCell.addEventListener("dragend", () => {
                const token = document.querySelector('.token--dragging');
                if (token) {
                    let size = token.getAttribute('size');
                    let image = token.getAttribute('src');
                    let id = token.getAttribute('id');
                    // Set token
                    token.classList.remove('token--dragging');
                    token.removeAttribute('onmousedown');
                    token.remove();

                    // Place token
                    const newToken = new Token(id, image, size);
                    socket.emit('PLACE_TOKEN', {x: parseInt(newCell.getAttribute('x')), y: parseInt(newCell.getAttribute('y'))}, newToken, user.username, room);
                    // Refresh token menu
                    resetTokenBodyData();
                }
            });

            cells.push(newCell);
        }
        y++;
    }
}

// Places token on board
function createToken(cell, newToken, username) {
    const token = cell.appendChild(document.createElement('img'));
    token.setAttribute('src', newToken.image);
    token.setAttribute('id', newToken.id);
    token.classList.add('token');
    token.classList.add(newToken.size);
    if (username) token.setAttribute('owner', username);
    giveTokenEvents(token);
}

function zoomIn() {
    let rs = getComputedStyle(root);
    let zoomValue = parseInt(rs.getPropertyValue('--zoom'));
    root.style.setProperty('--zoom', `${clamp(zoomValue + 1, zoomMin, zoomMax)}rem`);
}

function zoomOut() {
    let rs = getComputedStyle(root);
    let zoomValue = parseInt(rs.getPropertyValue('--zoom'));
    root.style.setProperty('--zoom', `${clamp(zoomValue - 1, zoomMin, zoomMax)}rem`);
}

function clearMap() {
    x = 0;
    y = 0;
    document.getElementById('grid').innerHTML = '';
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
            <button class="sidebar__btn sidebar__tokens" onclick="toggleTokenMenu('tokens')">Tokens</button>
            <button class="sidebar__btn sidebar__maps" onclick="toggleMapMenu('maps')">Maps</button>
        `);
    } else {
        sidebar.insertAdjacentHTML('beforeend', `
            <button class="sidebar__btn sidebar__characters" onclick="toggleCharacterMenu('characters')">Characters</button>
        `);
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
    console.log(playerList);
}));

socket.on('PLACE_TOKEN', ((cell, token, username) => {
    const newCell = findCell(cell.x, cell.y);
    createToken(newCell, token, username);
}));
