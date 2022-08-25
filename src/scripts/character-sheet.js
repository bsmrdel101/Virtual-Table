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
        let strMod = Math.floor((character.str - 10) / 2);
        let dexMod = Math.floor((character.dex - 10) / 2);
        let conMod = Math.floor((character.con - 10) / 2);
        let intMod = Math.floor((character.int - 10) / 2);
        let wisMod = Math.floor((character.wis - 10) / 2);
        let charMod = Math.floor((character.char - 10) / 2);

        const sheetWindow = document.querySelector('body').appendChild(document.createElement('div'));
        sheetWindow.classList.add('character-sheet');
        sheetWindow.insertAdjacentHTML('beforeend', `
            <div class="sheet-content">
                <div class="character-sheet__header">
                    <img class="character-sheet__image" src=${character.image}>
                    <h2>${character.name}</h2>
                </div>
                <div class="character-sheet__main">
                    <p>Level ${character.level}</p>
                </div>
                <div class="character-sheet__main">
                    <p>${character.race} ${character.class} ${character.background}</p>
                </div>
                <div class="character-sheet__main">
                    <p>Prof bonus: +${character.prof_bonus} Hit dice: ${character.level}d${character.hit_dice}</p>
                </div>
                <div class="character-sheet__main">
                    <p>AC: ${character.ac} Initiative: ${character.initiative} Movement: ${character.movement}</p>
                </div>
                <div class="character-sheet__health--temp">
                    <p class="temp-hp"><img src="../images/heart-blue.png"> ${character.temp_health}</p>
                </div>
                <div class="character-sheet__health">
                    <p class="hp"><img src="../images/heart-red.png"> ${character.max_health} / ${character.current_health}</p>
                </div>
                <div class="character-sheet__health-tracker">
                    <form onsubmit="damageHp(event)"><p>Damage <button type="submit">-</button><input type="number" onchange="dmgAddInput = event.target.value"></p></form>
                    <form onsubmit="healHp(event)"><p>Heal <button type="submit">+</button><input type="number" onchange="healAddInput = event.target.value"></p></form>
                    <form onsubmit="addTempHp(event)"><p>Temp Hp <button type="submit">+</button><input type="number" onchange="tempAddInput = event.target.value"></p></form>
                </div>
                <div class="character-sheet__scores">
                    <div class="character-sheet__score-box">
                        <p>Str</p>
                        <p>${character.str}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${strMod < 0 ? '' : '+'} ${strMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Dex</p>
                        <p>${character.dex}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${dexMod < 0 ? '' : '+'} ${dexMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Con</p>
                        <p>${character.con}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${conMod < 0 ? '' : '+'} ${conMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Int</p>
                        <p>${character.int}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${intMod < 0 ? '' : '+'} ${intMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Wis</p>
                        <p>${character.wis}</p>
                        <div class="character-sheet__modifier-box">
                            <p>${wisMod < 0 ? '' : '+'} ${wisMod}</p>
                        </div>
                    </div>
                    <div class="character-sheet__score-box">
                        <p>Char</p>
                        <p>${character.char}</p>
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

function damageHp(e) {
    e.preventDefault();
    let dmgAmount = parseInt(dmgAddInput);
    let tmpHpValue = character.temp_health;
    tmpHpValue -= dmgAmount;
    if (tmpHpValue < 0) tmpHpValue = 0;
    dmgAmount -= character.temp_health;
    if (dmgAmount < 0) dmgAmount = 0;
    
    setTempHealth({id: character.id, health: tmpHpValue});
    setHealth({id: character.id, health: character.current_health - dmgAmount});
    resetSheetData();
}

function healHp(e) {
    e.preventDefault();
    let healAmount = parseInt(healAddInput);
    if (character.current_health + healAmount > character.max_health) {
        setHealth({id: character.id, health: character.max_health});
    } else {
        setHealth({id: character.id, health: character.current_health + healAmount});
    }
    resetSheetData();
}

function addTempHp(e) {
    e.preventDefault();
    setTempHealth({id: character.id, health: character.temp_health + parseInt(tempAddInput)});
    resetSheetData();
}

function resetSheetData() {
    toggleCharacterSheet();
    setTimeout(function() { toggleCharacterSheet(); }, 100);
}