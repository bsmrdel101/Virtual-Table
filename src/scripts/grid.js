let gridSize = 25;
let x = 0; 
let y = 0;
let root = document.documentElement;
let zoomMin = 1;
let zoomMax = 10;


// Waits until the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupGrid();
    // root.style.setProperty('--background-image', `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwUhS4RzGYSNBN6rAgSzwcdpzoUkYYIg_Cvg&usqp=CAU')`);
});

function setupGrid() {
    document.getElementById('grid').addEventListener("contextmenu", e => e.preventDefault());
    for (let a = 0; a < gridSize; a++) {
        // Create row
        let newRow = document.getElementById('grid').appendChild(document.createElement('tr'));

        // Create cell
        for (let b = 0; b < gridSize; b++) {
            let newCell = newRow.appendChild(document.createElement('td'));
            newCell.classList.add('grid__cell');
            if (x > gridSize - 1) x = 0

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
                    addToken(newCell, new Token(image, size));

                    // Refresh token menu
                    resetTokenBodyData();
                }
            });
        }
        y++;
    }
}

// Places token on board
function addToken(cell, newToken) {
    const token = cell.appendChild(document.createElement('img'));
    token.setAttribute('src', newToken.image);
    token.classList.add('token');
    token.classList.add(newToken.size);

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