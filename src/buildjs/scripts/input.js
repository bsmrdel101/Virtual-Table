"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canUseHotkey = void 0;
const grid_1 = require("./grid");
const dashboard_1 = require("./dashboard");
const token_menu_1 = require("./menus/token.menu");
const map_menu_1 = require("./menus/map.menu");
const character_menu_1 = require("./menus/character.menu");
const creatures_1 = require("./creatures");
const character_sheet_1 = require("./character-sheet");
let canScale = false;
let targetPosX, targetPosY;
let dragging = false;
exports.canUseHotkey = { value: true };
// === EVENT HANDLERS === //
// Fires when user presses key
document.addEventListener('keydown', (e) => {
    if (exports.canUseHotkey.value) {
        switch (true) {
            case e.key === 'Meta' || e.key === 'Control':
                canScale = true;
                break;
            case e.key === 'Delete':
                for (const _token of document.getElementsByClassName('token')) {
                    if (_token.classList.contains('token--selected'))
                        _token.remove();
                }
                break;
            case e.key === '+' || e.key === '=':
                (0, grid_1.zoomIn)();
                break;
            case e.key === '-' || e.key === '_':
                (0, grid_1.zoomOut)();
                break;
            case e.which === 49:
                dashboard_1.client.clientType === 'dm' ? (0, token_menu_1.toggleTokenMenu)('tokens') : (0, character_menu_1.toggleCharacterMenu)('characters');
                break;
            case e.which === 50:
                dashboard_1.client.clientType === 'dm' ? (0, creatures_1.toggleCreaturesWindow)() : (0, character_sheet_1.toggleCharacterSheet)();
                break;
            case e.which === 51:
                dashboard_1.client.clientType === 'dm' ? (0, map_menu_1.toggleMapMenu)('maps') : console.log('nothing');
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
