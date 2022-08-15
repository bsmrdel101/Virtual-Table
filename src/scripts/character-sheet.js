let sheetOpen = false;
let tempHpInput, hpInput;
let dmgAddInput, healAddInput, tempAddInput;

function toggleCharacterSheet() {
    sheetOpen = !sheetOpen;
    if (sheetOpen) {
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
            </div>
        `);

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