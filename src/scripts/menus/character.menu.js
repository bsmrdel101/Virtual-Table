let characters = [];


function toggleCharacterMenu(menuName) {
    menuOpen = !menuOpen;
    if (menuOpen) {
        selectedMenu = 'characters';
        // Create menu
        document.querySelector('.game-page-container').insertAdjacentHTML('beforeend', `
            <div class="menu">
                <button class="menu__btn menu__btn--close" onclick="closeMenu()">X</button>
                <div class="menu__body"></div>
            </div>
        `);
        getCharacterBodyData();
    } else {
        closeMenu(menuName);
    }
}

async function getCharacterBodyData() {
    await getCharacters();
    for (let character of characters) {
        document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
            <div class="menu__item menu__item--character">
                <img src=${character.image}>
                <div class="menu__item__character-info">
                    <p>${character.name}</p>
                    <p>${character.level} ${character.class} ${character.race}</p>
                </div>
            </div>
        `);
    }

    // Add new character button
    document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
        <div class="menu__item menu__item--character">
            <button class="btn--new-item" onclick="newCharacter()">New Character</button>
        </div>
    `);
}

function newCharacter() {
    document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
        <form class="form--menu" onsubmit="submitNewCharacter(event)">
            <input placeholder="name" onchange="characterNameChange(event)" required>
            <button type="submit">Add Character</button>
        </form>
    `);
}

// For new map form
let newCharacterName, newCharacterLevel, newCharacterClass, newCharacterRace;
const characterNameChange = (e) => newCharacterName = e.target.value;

function submitNewCharacter(e) {
    e.preventDefault();
    addCharacter({name: newMapName, image: newMapImage});
}