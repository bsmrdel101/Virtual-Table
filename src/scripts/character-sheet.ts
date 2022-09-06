import { character } from './menus/character.menu';
import { setTempHealth, setHealth } from './routes/characters.route';
import { disableHotkeys, dragElement } from './utils';

const _character = character.value;
let sheetOpen = false;
let tempHpInput: string, hpInput: string;
let dmgAddInput: string, healAddInput: string, tempAddInput: string;
let strMod: number;
let dexMod: number;
let conMod: number;
let intMod: number;
let wisMod: number;
let charMod: number;

export function toggleCharacterSheet() {
    sheetOpen = !sheetOpen;
    if (sheetOpen) {
        let strMod = Math.floor((_character.str - 10) / 2);
        let dexMod = Math.floor((_character.dex - 10) / 2);
        let conMod = Math.floor((_character.con - 10) / 2);
        let intMod = Math.floor((_character.int - 10) / 2);
        let wisMod = Math.floor((_character.wis - 10) / 2);
        let charMod = Math.floor((_character.char - 10) / 2);

        const sheetWindow = document.querySelector('body').appendChild(document.createElement('div'));
        sheetWindow.classList.add('character-sheet');
        sheetWindow.insertAdjacentHTML('beforeend', `
            <div class="sheet-content">
                <div class="character-sheet__header">
                    <img class="character-sheet__image" src=${_character.image}>
                    <h2>${_character.name}</h2>
                </div>
                <div class="character-sheet__main">
                    <p>Level ${_character.level}</p>
                </div>
                <div class="character-sheet__main">
                    <p>${_character.race} ${_character.class} ${_character.background}</p>
                </div>
                <div class="character-sheet__main">
                    <p>Prof bonus: +${_character.prof_bonus} Hit dice: ${_character.level}d${_character.hit_dice}</p>
                </div>
                <div class="character-sheet__main">
                    <p>AC: ${_character.ac} Initiative: ${_character.initiative} Movement: ${_character.movement}</p>
                </div>
                <div class="character-sheet__health--temp">
                    <p class="temp-hp"><img src="../images/heart-blue.png"> ${_character.temp_health}</p>
                </div>
                <div class="character-sheet__health">
                    <p class="hp"><img src="../images/heart-red.png"> ${_character.max_health} / ${_character.current_health}</p>
                </div>
                <div class="character-sheet__health-tracker">
                    <form onsubmit="damageHp(event)"><p>Damage <button type="submit">-</button><input type="number" onchange="dmgAddInput = event.target.value"></p></form>
                    <form onsubmit="healHp(event)"><p>Heal <button type="submit">+</button><input type="number" onchange="healAddInput = event.target.value"></p></form>
                    <form onsubmit="addTempHp(event)"><p>Temp Hp <button type="submit">+</button><input type="number" onchange="tempAddInput = event.target.value"></p></form>
                </div>
                <div class="character-sheet__scores">
                    <div class="character-sheet__score-box">
                        <p>Str</p>
                        <p>${_character.str}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${strMod < 0 ? '' : '+'} ${strMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Dex</p>
                        <p>${_character.dex}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${dexMod < 0 ? '' : '+'} ${dexMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Con</p>
                        <p>${_character.con}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${conMod < 0 ? '' : '+'} ${conMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Int</p>
                        <p>${_character.int}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${intMod < 0 ? '' : '+'} ${intMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Wis</p>
                        <p>${_character.wis}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${wisMod < 0 ? '' : '+'} ${wisMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Char</p>
                        <p>${_character.char}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${charMod < 0 ? '' : '+'} ${charMod}</p>
                        </div>
                    </div>
                </div>
            </div>
        `);

        disableHotkeys();
        dragElement(sheetWindow, 'character-sheet');
    } else {
        document.querySelector('.character-sheet').remove();
    }
}

function damageHp(e: Event) {
    e.preventDefault();
    let dmgAmount = parseInt(dmgAddInput);
    let tmpHpValue = _character.temp_health;
    tmpHpValue -= dmgAmount;
    if (tmpHpValue < 0) tmpHpValue = 0;
    dmgAmount -= _character.temp_health;
    if (dmgAmount < 0) dmgAmount = 0;
    
    setTempHealth({id: _character.id, health: tmpHpValue});
    setHealth({id: _character.id, health: _character.current_health - dmgAmount});
    resetSheetData();
}

function healHp(e: Event) {
    e.preventDefault();
    let healAmount = parseInt(healAddInput);
    if (_character.current_health + healAmount > _character.max_health) {
        setHealth({id: _character.id, health: _character.max_health});
    } else {
        setHealth({id: _character.id, health: _character.current_health + healAmount});
    }
    resetSheetData();
}

function addTempHp(e: Event) {
    e.preventDefault();
    setTempHealth({id: _character.id, health: _character.temp_health + parseInt(tempAddInput)});
    resetSheetData();
}

function resetSheetData() {
    toggleCharacterSheet();
    setTimeout(function() { toggleCharacterSheet(); }, 100);
}