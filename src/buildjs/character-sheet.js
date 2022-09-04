"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleCharacterSheet = void 0;
const character_menu_1 = require("./menus/character.menu");
const characters_route_1 = require("./routes/characters.route");
const utils_1 = require("./utils");
const _character = character_menu_1.character.value;
let sheetOpen = false;
let tempHpInput, hpInput;
let dmgAddInput, healAddInput, tempAddInput;
let strMod;
let dexMod;
let conMod;
let intMod;
let wisMod;
let charMod;
function toggleCharacterSheet() {
    sheetOpen = !sheetOpen;
    if (sheetOpen) {
        let strMod = Math.floor((character_menu_1.character.str - 10) / 2);
        let dexMod = Math.floor((character_menu_1.character.dex - 10) / 2);
        let conMod = Math.floor((character_menu_1.character.con - 10) / 2);
        let intMod = Math.floor((character_menu_1.character.int - 10) / 2);
        let wisMod = Math.floor((character_menu_1.character.wis - 10) / 2);
        let charMod = Math.floor((character_menu_1.character.char - 10) / 2);
        const sheetWindow = document.querySelector('body').appendChild(document.createElement('div'));
        sheetWindow.classList.add('character-sheet');
        sheetWindow.insertAdjacentHTML('beforeend', `
            <div class="sheet-content">
                <div class="character-sheet__header">
                    <img class="character-sheet__image" src=${character_menu_1.character.image}>
                    <h2>${character_menu_1.character.name}</h2>
                </div>
                <div class="character-sheet__main">
                    <p>Level ${character_menu_1.character.level}</p>
                </div>
                <div class="character-sheet__main">
                    <p>${character_menu_1.character.race} ${character_menu_1.character.class} ${character_menu_1.character.background}</p>
                </div>
                <div class="character-sheet__main">
                    <p>Prof bonus: +${character_menu_1.character.prof_bonus} Hit dice: ${character_menu_1.character.level}d${character_menu_1.character.hit_dice}</p>
                </div>
                <div class="character-sheet__main">
                    <p>AC: ${character_menu_1.character.ac} Initiative: ${character_menu_1.character.initiative} Movement: ${character_menu_1.character.movement}</p>
                </div>
                <div class="character-sheet__health--temp">
                    <p class="temp-hp"><img src="../images/heart-blue.png"> ${character_menu_1.character.temp_health}</p>
                </div>
                <div class="character-sheet__health">
                    <p class="hp"><img src="../images/heart-red.png"> ${character_menu_1.character.max_health} / ${character_menu_1.character.current_health}</p>
                </div>
                <div class="character-sheet__health-tracker">
                    <form onsubmit="damageHp(event)"><p>Damage <button type="submit">-</button><input type="number" onchange="dmgAddInput = event.target.value"></p></form>
                    <form onsubmit="healHp(event)"><p>Heal <button type="submit">+</button><input type="number" onchange="healAddInput = event.target.value"></p></form>
                    <form onsubmit="addTempHp(event)"><p>Temp Hp <button type="submit">+</button><input type="number" onchange="tempAddInput = event.target.value"></p></form>
                </div>
                <div class="character-sheet__scores">
                    <div class="character-sheet__score-box">
                        <p>Str</p>
                        <p>${character_menu_1.character.str}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${strMod < 0 ? '' : '+'} ${strMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Dex</p>
                        <p>${character_menu_1.character.dex}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${dexMod < 0 ? '' : '+'} ${dexMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Con</p>
                        <p>${character_menu_1.character.con}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${conMod < 0 ? '' : '+'} ${conMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Int</p>
                        <p>${character_menu_1.character.int}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${intMod < 0 ? '' : '+'} ${intMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Wis</p>
                        <p>${character_menu_1.character.wis}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${wisMod < 0 ? '' : '+'} ${wisMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Char</p>
                        <p>${character_menu_1.character.char}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${charMod < 0 ? '' : '+'} ${charMod}</p>
                        </div>
                    </div>
                </div>
            </div>
        `);
        (0, utils_1.disableHotkeys)();
        (0, utils_1.dragElement)(sheetWindow, 'character-sheet');
    }
    else {
        document.querySelector('.character-sheet').remove();
    }
}
exports.toggleCharacterSheet = toggleCharacterSheet;
function damageHp(e) {
    e.preventDefault();
    let dmgAmount = parseInt(dmgAddInput);
    let tmpHpValue = _character.temp_health;
    tmpHpValue -= dmgAmount;
    if (tmpHpValue < 0)
        tmpHpValue = 0;
    dmgAmount -= _character.temp_health;
    if (dmgAmount < 0)
        dmgAmount = 0;
    (0, characters_route_1.setTempHealth)({ id: _character.id, health: tmpHpValue });
    (0, characters_route_1.setHealth)({ id: _character.id, health: _character.current_health - dmgAmount });
    resetSheetData();
}
function healHp(e) {
    e.preventDefault();
    let healAmount = parseInt(healAddInput);
    if (_character.current_health + healAmount > _character.max_health) {
        (0, characters_route_1.setHealth)({ id: _character.id, health: _character.max_health });
    }
    else {
        (0, characters_route_1.setHealth)({ id: _character.id, health: _character.current_health + healAmount });
    }
    resetSheetData();
}
function addTempHp(e) {
    e.preventDefault();
    (0, characters_route_1.setTempHealth)({ id: _character.id, health: _character.temp_health + parseInt(tempAddInput) });
    resetSheetData();
}
function resetSheetData() {
    toggleCharacterSheet();
    setTimeout(function () { toggleCharacterSheet(); }, 100);
}
