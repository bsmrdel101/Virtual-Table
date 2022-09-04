"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetTokenBodyData = exports.toggleTokenMenu = exports.addDefaultTokens = exports.tokens = void 0;
const tokens_route_1 = require("../routes/tokens.route");
const dashboard_1 = require("../dashboard");
const utils_1 = require("../utils");
let tokenSelected = false;
exports.tokens = { value: [] };
const defaultTokens = [
    { image: 'https://i.pinimg.com/236x/88/4a/05/884a056ba7a5a004becacbfd1bfd78fe.jpg', size: 'token--medium' },
    { image: 'https://i.imgur.com/5cibmUw.png', size: 'token--large' },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlW_xekRD291YBhLdPKYifDnF2HV74Csz0KQ&usqp=CAU', size: 'token--gargantuan' },
];
function addDefaultTokens() {
    for (let token of defaultTokens) {
        (0, tokens_route_1.addToken)(token);
    }
}
exports.addDefaultTokens = addDefaultTokens;
function toggleTokenMenu(menuName) {
    if (dashboard_1.client.clientType === 'dm') {
        utils_1.menuOpen.value = !utils_1.menuOpen.value;
        if (utils_1.menuOpen) {
            utils_1.selectedMenu.value = 'tokens';
            // Create menu
            document.querySelector('.game-page-container').insertAdjacentHTML('beforeend', `
                <div class="menu">
                    <button class="menu__btn menu__btn--close" onclick="closeMenu()">X</button>
                    <div class="menu__body"></div>
                </div>
            `);
            getTokenBodyData();
        }
        else {
            (0, utils_1.closeMenu)(menuName);
        }
    }
}
exports.toggleTokenMenu = toggleTokenMenu;
async function getTokenBodyData() {
    await (0, tokens_route_1.getTokens)();
    for (let token of exports.tokens.value) {
        if (token.creature) {
            document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
                <div class="menu__body--container">
                    <img src=${token.image} class="menu__item menu__item--token" ondragstart="placeToken(event, '${token.size}')" size=${token.size} relative=${token.creature} id=${token.id}>
                    <button class="menu__item--circle-btn" onclick="openCreatureStatsWindow('${token.creature}')"><i class="fa-solid fa-arrow-up-right-from-square"></i></button>
                </div>
            `);
        }
        else {
            document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
                <div class="menu__body--container">
                    <img src=${token.image} class="menu__item menu__item--token" ondragstart="placeToken(event, '${token.size}')" size=${token.size} relative=${token.creature} id=${token.id}>
                </div>
            `);
        }
    }
}
function placeToken(e, size) {
    tokenSelected = true;
    const token = e.target;
    token.classList.add('token--dragging');
    token.classList.add(size);
}
function resetTokenBodyData() {
    let deleteList = [];
    for (let token of document.getElementsByClassName('menu__item')) {
        deleteList.push(token);
    }
    for (let btn of document.getElementsByClassName('menu__item--circle-btn')) {
        deleteList.push(btn);
    }
    for (let box of document.getElementsByClassName('menu__body--container')) {
        deleteList.push(box);
    }
    for (let el of deleteList) {
        el.remove();
    }
    getTokenBodyData();
}
exports.resetTokenBodyData = resetTokenBodyData;
