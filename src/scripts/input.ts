import { zoomIn, zoomOut } from './grid';
import { client } from './dashboard';
import { toggleTokenMenu } from './menus/token.menu';
import { toggleMapMenu } from './menus/map.menu';
import { toggleCharacterMenu } from './menus/character.menu';
import { toggleCreaturesWindow } from './creatures';
import { toggleCharacterSheet } from './character-sheet';


let canScale = false;
let targetPosX: number, targetPosY: number;
let dragging = false;
export let canUseHotkey = {value: true};

// === EVENT HANDLERS === //

// Fires when user presses key
document.addEventListener('keydown', (e) => {
    if (canUseHotkey.value) {
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
            case e.which === 49:
                client.clientType === 'dm' ? toggleTokenMenu('tokens') : toggleCharacterMenu('characters');
                break;
            case e.which === 50:
                client.clientType === 'dm' ? toggleCreaturesWindow() : toggleCharacterSheet();
                break;
            case e.which === 51:
                client.clientType === 'dm' ? toggleMapMenu('maps') : console.log('nothing');
                break;
            default:
                break;
        }
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
            e.preventDefault();
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
    const mousePosX = e.x;
    const mousePosY = e.y;
    if (dragging) {
        document.querySelector('.grid-container').scrollBy((targetPosX - mousePosX) / 25, (targetPosY - mousePosY) / 25);
        document.querySelector('.game-page-container').classList.add('panning');
    }
});

