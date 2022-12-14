let characters = [];
let character;

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
    character = await getCharacter(id);
    skills = await getCharacterSkills(id);
    toggleCharacterMenu('characters');
}

// function newCharacter() {
    // TODO: Fill character skills with default skills after creating a character 
//     addCharacterSkill({id: id, name: 'Athletics', type: 'str', bonus: 0, proficient: false});
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