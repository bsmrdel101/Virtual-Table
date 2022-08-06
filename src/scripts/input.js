let canScale = false;
let targetPosX, targetPosY;
let dragging = false;

// Fires when user presses key
document.addEventListener('keydown', (e) => {
    switch (true) {
        case e.key === 'Meta' || e.key === 'Control':
            canScale = true;
            break;
        case e.key === 'Delete':
            for (const _token of document.getElementsByClassName('token')) {
                if (_token.classList.contains('token--selected')) _token.remove();
            }
            break;
        case e.key === '+' || e.key === '=':
            zoomIn();
            break;
        case e.key === '-' || e.key === '_':
            zoomOut();
            break;
        default:
            break;
    }
});

// Fires when user releases key
document.addEventListener('keyup', (e) => {
    switch (true) {
        case e.key === 'Meta' || e.key === 'ControlLeft':
            canScale = false;
            break;
        default:
            break;
    }
});

// Fires when user presses mouse button
document.addEventListener('mousedown', (e) => {
    switch (true) {
        case e.which === 2:
            targetPosX = e.x;
            targetPosY = e.y;
            dragging = true;
            break;
        default:
            break;
    }
});

// Fires when user releases mouse button
document.addEventListener('mouseup', (e) => {
    switch (true) {
        case e.which === 2:
            dragging = false;
            document.querySelector('.game-page-container').classList.remove('panning');
            break;
        default:
            break;
    }
});

// Fires when user moves mouse
document.addEventListener('mousemove', (e) => {
    mousePosX = e.x;
    mousePosY = e.y;
    if (dragging) {
        document.querySelector('.grid-container').scrollBy((targetPosX - mousePosX) / 25, (targetPosY - mousePosY) / 25);
        document.querySelector('.game-page-container').classList.add('panning');
    }
});