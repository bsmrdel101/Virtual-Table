"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disableHotkeys = exports.indexConverter = exports.dragElement = exports.changeRoute = exports.closeMenu = exports.findCell = exports.clamp = exports.selectedMenu = exports.menuOpen = void 0;
const grid_1 = require("./grid");
const token_menu_1 = require("./menus/token.menu");
const map_menu_1 = require("./menus/map.menu");
const character_menu_1 = require("./menus/character.menu");
const input_1 = require("./input");
exports.menuOpen = { value: false };
exports.selectedMenu = { value: '' };
// Clamp number between two values
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
exports.clamp = clamp;
// Will find and return a cell with the parameters given
function findCell(x, y) {
    for (const cell of grid_1.cells) {
        if (cell.getAttribute('x') === x.toString() && cell.getAttribute('y') === y.toString()) {
            return cell;
        }
    }
}
exports.findCell = findCell;
function closeMenu(menuName) {
    if (exports.selectedMenu.value === menuName) {
        // Close menu
        document.querySelector('.menu').remove();
        exports.menuOpen.value = false;
    }
    else {
        // Close menu, then open selected one
        document.querySelector('.menu').remove();
        exports.menuOpen.value = false;
        switch (menuName) {
            case 'tokens':
                (0, token_menu_1.toggleTokenMenu)('');
                break;
            case 'maps':
                (0, map_menu_1.toggleMapMenu)('');
                break;
            case 'characters':
                (0, character_menu_1.toggleCharacterMenu)('');
            default:
                break;
        }
    }
}
exports.closeMenu = closeMenu;
function changeRoute(route) {
    const wl = window.location;
    window.location.replace(`${wl.protocol}//${wl.host}/${route}`);
}
exports.changeRoute = changeRoute;
function dragElement(elmnt, headerName) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.querySelector(`.${headerName}__header`)) {
        // if present, the header is where you move the DIV from:
        document.querySelector(`.${headerName}__header`).addEventListener("onmousedown", dragMouseDown);
    }
    else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
exports.dragElement = dragElement;
// Would turn "Creature Name" into "creature-name"
function indexConverter(text) {
    return text.replace(/\s+/g, '-').toLowerCase();
}
exports.indexConverter = indexConverter;
function disableHotkeys() {
    // Detects when input is focused and disabled hotkeys
    for (let input of document.querySelectorAll('input')) {
        input.addEventListener('focusin', () => { input_1.canUseHotkey.value = false; });
        input.addEventListener('focusout', () => { input_1.canUseHotkey.value = true; });
    }
}
exports.disableHotkeys = disableHotkeys;
// if (typeof module !== 'undefined') module.exports = {
//     indexConverter
// };
