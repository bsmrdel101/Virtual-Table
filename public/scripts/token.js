let tokenDeltaX, tokenDeltaY;
let canScale = false;


document.addEventListener('keydown', (e) => {
    switch (true) {
        case e.which === 91 || e.which === 17:
            document.querySelector('.grid-container').classList.add('grid-container--no-scroll');
            canScale = true;
            break;
        case e.which === 46:
            for (const _token of document.getElementsByClassName('token')) {
                if (_token.classList.contains('token--selected')) _token.remove();
            }
        default:
            break;
    }
});
document.addEventListener('keyup', (e) => {
    switch (true) {
        case e.which === 91 || e.which === 17:
            document.querySelector('.grid-container').classList.remove('grid-container--no-scroll');
            canScale = false;
            break;
        default:
            break;
    }
});

// Add event listeners for the token
function giveTokenEvents(token) {
    token.addEventListener("dragstart", (e) => {
        e.target.classList.add('token--dragging');
    });
    token.addEventListener("dragend", (e) => {
        e.target.classList.remove('token--dragging');
    });
    token.addEventListener('mousedown',(e) => {
        switch (e.which) {
            case 3:
                console.log('open menu');
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
        if (canScale) {
            if (e.wheelDeltaY < 0) {
                upscaleToken(token);
            } else {
                descaleToken(token);
            }
        }
    });
}

function selectToken(token) {
    if (token.classList.contains('token--selected')) {
        token.classList.remove('token--selected');
    } else {
        for (const _token of document.getElementsByClassName('token')) {
            _token.classList.remove('token--selected');
        }
        token.classList.add('token--selected');
    }
}

function upscaleToken(token) {
    if (token.classList.contains('token--tiny')) {
        token.classList.remove('token--tiny');
        token.classList.add('token--small');
    } else if (token.classList.contains('token--small')) {
        token.classList.remove('token--small');
        token.classList.add('token--medium');
    } else if (token.classList.contains('token--medium')) {
        token.classList.remove('token--medium');
        token.classList.add('token--large');
    } else if (token.classList.contains('token--large')) {
        token.classList.remove('token--large');
        token.classList.add('token--huge');
    } else if (token.classList.contains('token--huge')) {
        token.classList.remove('token--huge');
        token.classList.add('token--gargantuan');
    }
}

function descaleToken(token) {
    if (token.classList.contains('token--gargantuan')) {
        token.classList.remove('token--gargantuan');
        token.classList.add('token--huge');
    } else if (token.classList.contains('token--huge')) {
        token.classList.remove('token--huge');
        token.classList.add('token--large');
    } else if (token.classList.contains('token--large')) {
        token.classList.remove('token--large');
        token.classList.add('token--medium');
    } else if (token.classList.contains('token--medium')) {
        token.classList.remove('token--medium');
        token.classList.add('token--small');
    } else if (token.classList.contains('token--small')) {
        token.classList.remove('token--small');
        token.classList.add('token--tiny');
    }
}
