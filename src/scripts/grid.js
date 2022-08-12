let x = 0; 
let y = 0;
let root = document.documentElement;
let zoomMin = 0.5;
let zoomMax = 10;
let user;
let cells = [];

// Waits until the DOM is loaded
// document.addEventListener('DOMContentLoaded', async () => {
//     user = await fetchUser();
//     setupGrid(25, 25, false);

//     if (user.new_user) {
//         addDefaultTokens();
//         changeNewUser(false);
//     }
// });

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
                    // Set token
                    token.classList.remove('token--dragging');
                    token.removeAttribute('onmousedown');
                    token.remove();

                    // Place token
                    const newToken = new Token(image, size);
                    socket.emit('placedToken', {x: parseInt(newCell.getAttribute('x')), y: parseInt(newCell.getAttribute('y'))}, newToken, user.username);

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

async function fetchUser() {
    const user = await getUser();
    return user;
}

socket.on('connect', async () => {
    document.addEventListener('DOMContentLoaded', async () => {
        user = await fetchUser();
        setupGrid(25, 25, false);
    
        if (user.new_user) {
            addDefaultTokens();
            changeNewUser(false);
        }

        socket.emit('populateData');
    });
});

socket.on('placedToken', ((cell, token, username) => {
    const newCell = findCell(cell.x, cell.y);
    createToken(newCell, token, username);
}));

// Reloads all the assets such as tokens and the map, when the user leaves and joins the page again.
socket.on('populateData', (async (placedTokens, selectedMap) => {
    // Place tokens
    for (let token of placedTokens) {
        const newCell = await findCell(token.cell.x, token.cell.y);
        createToken(newCell, token.token, token.username);
    }

    // Load current map
    let e = selectedMap[0].e;
    let map = selectedMap[1].map;
    if (map.name === 'Default Map') {
        // Set image to nothing
        root.style.setProperty('--background-image', `url('')`);
        setupGrid(25, 25, true);
    } else {
        // Set new map image
        root.style.setProperty('--background-image', `url(${map.image})`);
        setupGrid(e.width / 2, e.height / 2, true);
    }
}));