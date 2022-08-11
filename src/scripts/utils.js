let menuOpen = false;
let selectedMenu;

// Clamp number between two values
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// Will find and return a cell with the parameters given
function findCell(x, y) {
    for (const cell of cells) {
        if (cell.getAttribute('x') === x.toString() && cell.getAttribute('y') === y.toString()) {
            return cell;
        }
    }
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
            default:
                break;
        }
    }
}

function changeRoute(route) {
    const wl = window.location;
    window.location.replace(`${wl.protocol}//${wl.host}/${route}`);
}