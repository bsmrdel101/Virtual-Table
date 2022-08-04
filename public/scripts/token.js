let tokenDeltaX, tokenDeltaY;
let selected = false;
let canScale = false;


document.addEventListener('keydown', (e) => {
    if (e.which === 91 || e.which === 17) {
        document.querySelector('.grid-container').classList.add('grid-container--no-scroll');
        canScale = true;
    }
});
document.addEventListener('keyup', (e) => {
    if (e.which === 91 || e.which === 17) {
        document.querySelector('.grid-container').classList.remove('grid-container--no-scroll');
        canScale = false;
    }
});

// Add event listeners for the token
function giveTokenEvents(token, cell) {
    token.addEventListener("dragstart", (e) => {
        e.target.classList.add('token--dragging');
    });
    token.addEventListener("dragend", (e) => {
        e.target.classList.remove('token--dragging');
    });
    token.addEventListener('mousedown',(e) => {
        switch (e.which) {
            case 3:
                console.log('delete');
                break;
            default:
                break;
        }
    });
    token.addEventListener('mouseup',(e) => {
        switch (e.which) {
            case 1:
                selectToken(e.target);
                break;
            default:
                break;
        }
    });
    token.addEventListener('wheel', (e) => {
        if (selected && canScale) {
            if (e.wheelDeltaY < 0) {
                // Scale up token
                if (cell.getAttribute('x') > 0 && cell.getAttribute('y') > 0) {
                    upscaleToken(token);
                } else {
                    // Determine how far the token has to move
                    if (token.classList.contains('token--medium')) {
                        tokenDeltaX = 1;
                        tokenDeltaY = 1;
                    } else if (token.classList.contains('token--large')) {
                        tokenDeltaX = 2;
                        tokenDeltaY = 2;
                    }

                    // Move the token into the grid
                    const selectedCell = findCell(parseInt(cell.getAttribute('x')) + tokenDeltaX, parseInt(cell.getAttribute('y')) + tokenDeltaY);
                    cell.classList.add('grid__cell--empty');
                    selectedCell.classList.remove('grid__cell--empty');
                    selectedCell.appendChild(token);
                    upscaleToken(token);
                }
            } else {
                // Scale down token
                descaleToken(token);
            }
        }
    });
}

function selectToken(token) {
    if (selected) {
        token.classList.remove('token--selected');
        selected = false;
        document.querySelector('.grid-container').classList.remove('grid-container--no-scroll');
    } else {
        token.classList.add('token--selected');
        selected = true;
    }
}

function upscaleToken(token) {
    if (token.classList.contains('token--medium')) {
        token.classList.remove('token--medium');
        token.classList.add('token--large');
    }
}

function descaleToken(token) {
    if (token.classList.contains('token--large')) {
        token.classList.remove('token--large');
        token.classList.add('token--medium');
    }
}

