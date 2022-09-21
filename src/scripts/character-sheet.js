let sheetOpen = false;
let tempHpInput, hpInput;
let dmgAddInput, healAddInput, tempAddInput;
let strMod, dexMod, conMod, intMod, wisMod, charMod;

const toggleCharacterSheet = () => {
    sheetOpen = !sheetOpen;
    if (sheetOpen) {
        renderCharacterSheet();
    } else {
        document.querySelector('.character-sheet').remove();
    }
}

// Returns modifiers for each ability score
const getAbilityScoreModifiers = () => {
    let strMod = Math.floor((character.str - 10) / 2);
    let dexMod = Math.floor((character.dex - 10) / 2);
    let conMod = Math.floor((character.con - 10) / 2);
    let intMod = Math.floor((character.int - 10) / 2);
    let wisMod = Math.floor((character.wis - 10) / 2);
    let charMod = Math.floor((character.char - 10) / 2);
    return { strMod, dexMod, conMod, intMod, wisMod, charMod };
}

// Renders the character sheet
const renderCharacterSheet = () => {
    const sheetWindow = document.querySelector('body').appendChild(document.createElement('div'));
    const modifiers = getAbilityScoreModifiers();
    sheetWindow.classList.add('character-sheet');
    sheetWindow.insertAdjacentHTML('beforeend', characterSheetHtml(character, modifiers));
    disableHotkeys();
    dragElement(sheetWindow, 'character-sheet');
}

const characterSheetHtml = (character, modifiers) => {
    return `
        <div class="sheet-content">
            <button class="btn--window-close" onclick="toggleCharacterSheet()">X</button>
            ${characterSheetMainPageHtml(character, modifiers)}
        </div>
    `;
}

// Html for character sheet main page
const characterSheetMainPageHtml = (character, modifiers) => `
    <div class="character-sheet__header">
        <img class="character-sheet__image" src=${character.image}>
        <div class="character-sheet__header--block">
            <h2>${character.name}</h2>
            <p>${character.race} ${character.class}, ${character.background}</p>
        </div>
    </div>
    <div class="character-sheet__main">
        ${characterSheetMainStatsHtml()}
    </div>
    <div class="character-sheet__small-stat-blocks">
        ${characterSheetSmStatBlocksHtml()}
    </div>
    <div class="character-sheet__scores">
        ${characterSheetScoresHtml(modifiers)}
    </div>
        ${characterSheetHealth()}
`;

const characterSheetMainStatsHtml = () => `
    <p><span class="bold">Level</span> ${character.level}</p>
    <p><span class="bold">Prof bonus</span> +${character.prof_bonus}</p>
    <p><span class="bold">Hit dice</span> 1d${character.hit_dice}</p>
    <p><span class="bold">Inspiration</span> <img class="inspiration-icon" onclick="toggleInspiration(event)" src=${character.inspiration ? '../images/star-filled.png' : '../images/star-empty.png'}></p>
`;

const characterSheetSmStatBlocksHtml = () => `
    <div class="character-sheet__small-stat-blocks--block">
        <p><span class="bold">AC</span></p>
        <p>${character.ac}</p>
    </div>
    <div class="character-sheet__small-stat-blocks--block">
        <p><span class="bold">Init</span></p>
        <p>${character.initiative < 0 ? '' : '+'}${character.initiative}</p>
    </div>
    <div class="character-sheet__small-stat-blocks--block">
        <p><span class="bold">Speed</span></p>
        <p>${character.walk_speed} ft</p>
    </div>
`;

const characterSheetScoresHtml = (modifiers) => {
    const { strMod, dexMod, conMod, intMod, wisMod, charMod } = modifiers;
    return `
        <div class="character-sheet__score-box">
            <p class="bold">Str</p>
            <p>${strMod < 0 ? '' : '+'}${strMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.str}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Dex</p>
            <p>${dexMod < 0 ? '' : '+'}${dexMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.dex}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Con</p>
            <p>${conMod < 0 ? '' : '+'}${conMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.con}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Int</p>
            <p>${intMod < 0 ? '' : '+'}${intMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.int}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Wis</p>
            <p>${wisMod < 0 ? '' : '+'}${wisMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.wis}</p>
            </div>
        </div>
        <div class="character-sheet__score-box">
            <p class="bold">Char</p>
            <p>${charMod < 0 ? '' : '+'}${charMod}</p>
            <div class="character-sheet__modifier-box">
                <p>${character.char}</p>
            </div>
        </div>
    `;
}

const characterSheetHealth = () => `
    <div class="character-sheet__health--temp">
        <p class="temp-hp"><img src="../images/heart-blue.png"> ${character.temp_health}</p>
    </div>
    <div class="character-sheet__health">
        <p class="hp"><img src="../images/heart-red.png">${character.current_health} / ${character.max_health}</p>
    </div>
    <div class="character-sheet__health-tracker">
        <form onsubmit="damageHp(event)"><p><span class="bold">Damage</span> <button type="submit">-</button><input id="dmg-player-hp-input" type="number" onchange="dmgAddInput = event.target.value"></p></form>
        <form onsubmit="healHp(event)"><p><span class="bold">Heal</span> <button type="submit">+</button><input id="heal-player-hp-input" type="number" onchange="healAddInput = event.target.value"></p></form>
        <form onsubmit="addTempHp(event)"><p><span class="bold">Temp Hp</span> <button type="submit">+</button><input id="add-player-tmp-hp-input" type="number" onchange="tempAddInput = event.target.value"></p></form>
    </div>
`;

const damageHp = (e) => {
    e.preventDefault();
    const healthContainer = document.querySelector('.character-sheet__health');
    const tempHealthContainer = document.querySelector('.character-sheet__health--temp');
    let dmgAmount = parseInt(dmgAddInput);
    let tmpHpValue = character.temp_health;
    tmpHpValue -= dmgAmount;
    if (tmpHpValue < 0) tmpHpValue = 0;
    dmgAmount -= character.temp_health;
    if (dmgAmount < 0) dmgAmount = 0;
    const newHealth = character.current_health - dmgAmount;
    
    setTempHealth({ id: character.id, health: tmpHpValue });
    setHealth({ id: character.id, health: newHealth });
    healthContainer.innerHTML = '';
    tempHealthContainer.innerHTML = '';
    healthContainer.insertAdjacentHTML('beforeend', `
        <p class="hp"><img src="../images/heart-red.png">${newHealth} / ${character.max_health}</p>
    `);
    tempHealthContainer.insertAdjacentHTML('beforeend', `
        <p class="temp-hp"><img src="../images/heart-blue.png"> ${tmpHpValue}</p>
    `);
    document.getElementById('dmg-player-hp-input').value = '';
    dmgAddInput = 0;
}

const healHp = (e) => {
    e.preventDefault();
    const elmt = document.querySelector('.character-sheet__health');
    const healAmount = parseInt(healAddInput);
    let newHealth = character.current_health + healAmount;
    if (newHealth > character.max_health) {
        newHealth = character.max_health;
        setHealth({ id: character.id, health: newHealth });
    } else {
        setHealth({ id: character.id, health: newHealth });
    }

    elmt.innerHTML = '';
    elmt.insertAdjacentHTML('beforeend', `
        <p class="hp"><img src="../images/heart-red.png">${newHealth} / ${character.max_health}</p>
    `);
    document.getElementById('heal-player-hp-input').value = '';
    healAddInput = 0;
}

const addTempHp = (e) => {
    e.preventDefault();
    const elmt = document.querySelector('.character-sheet__health--temp');
    const newTempHealth = character.temp_health + parseInt(tempAddInput);
    setTempHealth({ id: character.id, health: newTempHealth });
    elmt.innerHTML = '';
    elmt.insertAdjacentHTML('beforeend', `
        <p class="temp-hp"><img src="../images/heart-blue.png"> ${newTempHealth}</p>
    `);
    document.getElementById('add-player-tmp-hp-input').value = '';
    tempAddInput = 0;
}

const toggleInspiration = (e) => {
    e.preventDefault();
    const { inspiration, id } = character;
    const newInspiration = !inspiration;
    setInspiration({ newInspiration, id });
    resetSheetData();
}

const resetSheetData = () => {
    toggleCharacterSheet();
    setTimeout(() => { toggleCharacterSheet(); }, 100);
}