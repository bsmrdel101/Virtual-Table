import { disableHotkeys, dragElement } from './utils';

let newCharacterOpen = false;

export function toggleNewCharacterWindow() {
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
        disableHotkeys();
        dragElement(newCharacterWindow, 'new-character');
    } else {
        document.querySelector('.new-character').remove();
    }
}

// For new character form
let newCharacterName: string, newCharacterImage: string, newCharacterLevel: number, newCharacterClass: string, newCharacterRace: string;
const characterNameChange = (e: any) => newCharacterName = e.target.value;
const characterImageChange = (e: any) => newCharacterImage = e.target.files[0];

function submitNewCharacter(e: any) {
    e.preventDefault();
    console.log(newCharacterImage);
    // addCharacter({
    //     name: newMapName, 
    //     image: newMapImage,
    // });
}