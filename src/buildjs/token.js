"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.giveTokenEvents = void 0;
let tokenDeltaX, tokenDeltaY;
// Add event listeners for the token
function giveTokenEvents(token) {
    // Fires when user begins dragging
    token.addEventListener("dragstart", (e) => {
        e.target.classList.add('token--dragging');
    });
    // Fires when user stops dragging
    token.addEventListener("dragend", (e) => {
        e.target.classList.remove('token--dragging');
        document.querySelector('.game-page-container').classList.remove('token--dragging-cursor');
    });
    // Fires when user clicks on token
    token.addEventListener('mousedown', (e) => {
        switch (e.which) {
            case 1:
                document.querySelector('.game-page-container').classList.add('token--dragging-cursor');
                break;
            case 3:
                console.log('Right click');
                break;
            default:
                break;
        }
    });
    // Fires when user releases click on token
    token.addEventListener('mouseup', (e) => {
        switch (e.which) {
            case 1:
                // selectToken(e.target);
                document.querySelector('.game-page-container').classList.remove('token--dragging-cursor');
                break;
            default:
                break;
        }
    });
    // Fires when user uses scroll wheel
    // token.addEventListener('wheel', (e) => {
    //     if (canScale) {
    //         if (e.wheelDeltaY < 0) {
    //             upscaleToken(token);
    //         } else {
    //             descaleToken(token);
    //         }
    //     }
    // });
}
exports.giveTokenEvents = giveTokenEvents;
// Highlights and selects token
// function selectToken(token) {
//     if (token.classList.contains('token--selected')) {
//         token.classList.remove('token--selected');
//     } else {
//         for (const _token of document.getElementsByClassName('token')) {
//             _token.classList.remove('token--selected');
//         }
//         token.classList.add('token--selected');
//     }
// }
function upscaleToken(token) {
    if (token.classList.contains('token--tiny')) {
        token.classList.remove('token--tiny');
        token.classList.add('token--small');
    }
    else if (token.classList.contains('token--small')) {
        token.classList.remove('token--small');
        token.classList.add('token--medium');
    }
    else if (token.classList.contains('token--medium')) {
        token.classList.remove('token--medium');
        token.classList.add('token--large');
    }
    else if (token.classList.contains('token--large')) {
        token.classList.remove('token--large');
        token.classList.add('token--huge');
    }
    else if (token.classList.contains('token--huge')) {
        token.classList.remove('token--huge');
        token.classList.add('token--gargantuan');
    }
}
function descaleToken(token) {
    if (token.classList.contains('token--gargantuan')) {
        token.classList.remove('token--gargantuan');
        token.classList.add('token--huge');
    }
    else if (token.classList.contains('token--huge')) {
        token.classList.remove('token--huge');
        token.classList.add('token--large');
    }
    else if (token.classList.contains('token--large')) {
        token.classList.remove('token--large');
        token.classList.add('token--medium');
    }
    else if (token.classList.contains('token--medium')) {
        token.classList.remove('token--medium');
        token.classList.add('token--small');
    }
    else if (token.classList.contains('token--small')) {
        token.classList.remove('token--small');
        token.classList.add('token--tiny');
    }
}
