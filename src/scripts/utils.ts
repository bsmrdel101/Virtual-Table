import { cells } from './grid';
import { toggleTokenMenu } from './menus/token.menu';
import { toggleMapMenu } from './menus/map.menu';
import { toggleCharacterMenu } from './menus/character.menu';
import { canUseHotkey } from './input';

export let menuOpen: any = {value: false};
export let selectedMenu: any = {value: ''};

// Clamp number between two values
export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

// Will find and return a cell with the parameters given
export function findCell(x: number, y: number) {
    for (const cell of cells) {
        if (cell.getAttribute('x') === x.toString() && cell.getAttribute('y') === y.toString()) {
            return cell;
        }
    }
}

export function closeMenu(menuName: string) {
    if (selectedMenu.value === menuName) {
        // Close menu
        document.querySelector('.menu').remove();
        menuOpen.value = false;
    } else {
        // Close menu, then open selected one
        document.querySelector('.menu').remove();
        menuOpen.value = false;

        switch (menuName) {
            case 'tokens':
                toggleTokenMenu('');
                break;
            case 'maps':
                toggleMapMenu('');
                break;
            case 'characters':
                toggleCharacterMenu('');
            default:
                break;
        }
    }
}

export function changeRoute(route: string) {
    const wl = window.location;
    window.location.replace(`${wl.protocol}//${wl.host}/${route}`);
}

export function dragElement(elmnt: any, headerName: string) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.querySelector(`.${headerName}__header`)) {
      // if present, the header is where you move the DIV from:
      document.querySelector(`.${headerName}__header`).addEventListener("mousedown", dragMouseDown);
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.addEventListener("mousedown", dragMouseDown);
    }
  
    function dragMouseDown(e: any) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
  
    function elementDrag(e: any) {
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

// Would turn "Creature Name" into "creature-name"
export function indexConverter(text: string) {
    return text.replace(/\s+/g, '-').toLowerCase();
}

export function disableHotkeys() {
    // Detects when input is focused and disabled hotkeys
    for (let input of document.querySelectorAll('input')) {
        input.addEventListener('focusin', () => { canUseHotkey.value = false; });
        input.addEventListener('focusout', () => { canUseHotkey.value = true; });
    }
}

// if (typeof module !== 'undefined') module.exports = {
//     indexConverter
// };