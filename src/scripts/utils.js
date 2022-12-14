let menuOpen = false;
let selectedMenu;

// Clamp number between two values
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// Will find and return a cell with the parameters given
function findCell(x, y) {
    for (const cell of document.querySelectorAll('.grid__cell')) {
        if (cell.getAttribute('x') === x.toString() && cell.getAttribute('y') === y.toString()) {
            return cell;
        }
    }
}

function findRelativeCell(elmt, offsetX, offsetY) {
    const cellWidth = elmt.clientWidth;
    const cellHeight = elmt.clientHeight;
    const numXCells = Math.ceil(offsetX / cellWidth) - 1;
    const numYCells = Math.ceil(offsetY / cellHeight) - 1;
    return findCell(elmt.getAttribute('x') - numXCells, elmt.getAttribute('y') - numYCells);
}

function closeMenu(menuName) {
    if (selectedMenu == menuName) {
        // Close menu
        document.querySelector('.menu').remove();
        menuOpen = false;
    } else {
        // Close menu, then open selected one
        document.querySelector('.menu').remove();
        menuOpen = false;

        switch (menuName) {
            case 'tokens':
                toggleTokenMenu();
                break;
            case 'maps':
                toggleMapMenu();
                break;
            case 'characters':
                toggleCharacterMenu();
            default:
                break;
        }
    }
}

function changeRoute(route) {
    const wl = window.location;
    window.location.replace(`${wl.protocol}//${wl.host}/${route}`);
}

function dragElement(elmnt, headerName) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.querySelector(`.${headerName}__header`)) {
      // if present, the header is where you move the DIV from:
      document.querySelector(`.${headerName}__header`).onmousedown = dragMouseDown;
    } else {
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

// Would turn "Creature Name" into "creature-name"
function indexConverter(text) {
    return text.replace(/\s+/g, '-').toLowerCase();
}

function disableHotkeys() {
    // Detects when input is focused and disabled hotkeys
    for (let input of document.querySelectorAll('input')) {
        input.addEventListener('focusin', () => { canUseHotkey = false; });
        input.addEventListener('focusout', () => { canUseHotkey = true; });
    }
}

if (typeof module !== 'undefined') module.exports = {
    indexConverter,
    findRelativeCell
};