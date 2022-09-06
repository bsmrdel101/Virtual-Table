"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleNewCharacterWindow = void 0;
const utils_1 = require("./utils");
let newCharacterOpen = false;
function toggleNewCharacterWindow() {
    newCharacterOpen = !newCharacterOpen;
    if (newCharacterOpen) {
        const newCharacterWindow = document.querySelector('body').appendChild(document.createElement('div'));
        newCharacterWindow.classList.add('new-character');
        newCharacterWindow.insertAdjacentHTML('beforeend', `
            <form class="new-character__form" onsubmit="submitNewCharacter(event)">
                <center>
                    <div class="new-character__header">
                        <h2>New Character</h2>
                    </div>
                    <label for="nc-image">Image</label>
                    <input id="nc-image" type="file" accept="image/png, image/jpeg" onchange="characterImageChange(event)">
                    <div class="nc-input-box">
                        <label for="nc-name">Name</label>
                        <input id="nc-name" placeholder="Steve">
                    </div>
                    <div class="nc-input-box">
                        <label for="nc-class">Class</label>
                        <input id="nc-class" placeholder="Barbarian">
                    </div>
                    <div class="nc-input-box">
                        <label for="nc-race">Race</label>
                        <input id="nc-race" placeholder="Goliath">
                    </div>
                    <div class="nc-input-box">
                        <label for="nc-background">Background</label>
                        <input id="nc-background" placeholder="Noble">
                    </div>
                    <button type="submit">Submit</button>
                </center>
            </form>
        `);
        (0, utils_1.disableHotkeys)();
        (0, utils_1.dragElement)(newCharacterWindow, 'new-character');
    }
    else {
        document.querySelector('.new-character').remove();
    }
}
exports.toggleNewCharacterWindow = toggleNewCharacterWindow;
// For new character form
let newCharacterName, newCharacterImage, newCharacterLevel, newCharacterClass, newCharacterRace;
const characterNameChange = (e) => newCharacterName = e.target.value;
const characterImageChange = (e) => newCharacterImage = e.target.files[0];
function submitNewCharacter(e) {
    e.preventDefault();
    console.log(newCharacterImage);
    // addCharacter({
    //     name: newMapName, 
    //     image: newMapImage,
    // });
}
