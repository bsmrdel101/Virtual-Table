import { menuOpen, selectedMenu, closeMenu } from '../utils';
import { getCharacters, getCharacter } from '../routes/characters.route';

export let characters: any = {value: []};
export let character: any = {value: {}};

export function toggleCharacterMenu(menuName: string) {
    menuOpen.value = !menuOpen.value;
    if (menuOpen.value) {
        selectedMenu.value = 'characters';
        // Create menu
        document.querySelector('.game-page-container').insertAdjacentHTML('beforeend', `
            <div class="menu">
                <button class="menu__btn menu__btn--close">X</button>
                <div class="menu__body"></div>
            </div>
        `);
        document.querySelector('.menu__btn--close').addEventListener('click', () => closeMenu(menuName));
        getCharacterBodyData();
    } else {
        closeMenu(menuName);
    }
}

async function getCharacterBodyData() {
    await getCharacters();
    for (let character of characters) {
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

async function selectCharacter(id: string) {
    character = await getCharacter(id);
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