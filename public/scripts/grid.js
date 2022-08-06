let gridSize = 25;
let x = 0; 
let y = 0;
let cells = [];
let root = document.documentElement;
let zoomMin = 1;
let zoomMax = 10;


// Waits until the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupGrid();
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
            newCell.onclick = selectCell; // TEMPORARY
            if (x > gridSize - 1) x = 0

            newCell.setAttribute('x', x);
            newCell.setAttribute('y', y);
            x++;

            // Fires when element is dragged over this grid cell
            newCell.addEventListener("dragover", (e) => {
                const draggable = document.querySelector('.token--dragging');
                newCell.appendChild(draggable);
            });
            
            // Add cell to cells array
            cells.push(newCell);
        }
        y++;
    }
}

function selectCell(e) {
    const newToken = new Token('https://i.pinimg.com/236x/88/4a/05/884a056ba7a5a004becacbfd1bfd78fe.jpg', 'token--medium');
    addToken(e.target, newToken.size, newToken.image);
}

// Places token on board
function addToken(cell, size, image) {
    const token = cell.appendChild(document.createElement('img'));
    token.setAttribute('src', image);
    token.classList.add('token');
    token.classList.add(size);

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