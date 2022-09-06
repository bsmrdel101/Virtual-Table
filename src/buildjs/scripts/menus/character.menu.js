"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleCharacterMenu = exports.character = exports.characters = void 0;
const utils_1 = require("../utils");
const characters_route_1 = require("../routes/characters.route");
exports.characters = { value: [] };
exports.character = { value: {} };
function toggleCharacterMenu(menuName) {
    utils_1.menuOpen.value = !utils_1.menuOpen.value;
    if (utils_1.menuOpen.value) {
        utils_1.selectedMenu.value = 'characters';
        // Create menu
        document.querySelector('.game-page-container').insertAdjacentHTML('beforeend', `
            <div class="menu">
                <button class="menu__btn menu__btn--close" onclick="closeMenu()">X</button>
                <div class="menu__body"></div>
            </div>
        `);
        getCharacterBodyData();
    }
    else {
        (0, utils_1.closeMenu)(menuName);
    }
}
exports.toggleCharacterMenu = toggleCharacterMenu;
async function getCharacterBodyData() {
    await (0, characters_route_1.getCharacters)();
    for (let character of exports.characters) {
        document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
            <div class="menu__item menu__item--character" onclick="selectCharacter(${character.id})">
                <img src=${character.image}>
                <div>
                    <p>${character.level} ${character.name} ${character.class}</p>
                </div>
            </div>
        `);
    }
    // Add new character button
    document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
        <div class="menu__item menu__item--character-btn">
            <button class="btn--new-item" onclick="toggleNewCharacterWindow()">New Character</button>
        </div>
    `);
}
async function selectCharacter(id) {
    exports.character = await (0, characters_route_1.getCharacter)(id);
    toggleCharacterMenu('characters');
}
// function newCharacter() {
//     document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
//         <form class="form--menu" onsubmit="submitNewCharacter(event)">
//             <input placeholder="name" onchange="characterNameChange(event)" required>
//             <button type="submit">Add Character</button>
//         </form>
//     `);
// }
// // For new character form
// let newCharacterName, newCharacterLevel, newCharacterClass, newCharacterRace;
// const characterNameChange = (e) => newCharacterName = e.target.value;
// function submitNewCharacter(e) {
//     e.preventDefault();
//     addCharacter({name: newMapName, image: newMapImage});
// }
