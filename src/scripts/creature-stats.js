let creature;
let creatureIndexList = [];
let canOpenStats = true;

async function openCreatureStatsWindow(index, custom) {
    for (let listItem of creatureIndexList) {
        if (listItem === index) {
            if (document.querySelector(`.creature-stats-window--${index}`)) document.querySelector(`.creature-stats-window--${index}`).remove();         
            creatureIndexList.splice(creatureIndexList.indexOf(index), 1);
            return;
        }
    }

    creatureIndexList.push(index);
    creature = await getSpecificCreature(index, custom);
    const window = document.querySelector('body').appendChild(document.createElement('div'));
    window.classList.add('creature-stats-window');
    window.classList.add(`creature-stats-window--${creature.index}`);

    if (custom) {
        window.insertAdjacentHTML('beforeend', `
            <div class="creature-stats-content">
                <button class="btn--window-close" onclick="removeCreatureStatsWindow('${creature.index}')">X</button>
                <div class="creature-stats-window__header creature-stats-window--${creature.index}__header">
                    <h3>${creature.name}</h3>
                </div>
                <div class="creature-stats-window__body">
                    <p>${creature.size}, ${creature.type}, ${creature.alignment}</p>
                    <p>AC: ${creature.ac}</p>
                    <p>Health: ${creature.hit_points}, Hit dice: ${creature.hit_dice}</p>
                </div>
                <div class="creature-stats-window__speed" id="speed--${creature.index}"></div>
                <div class="creature-stats-window__scores" id="scores--${creature.index}"></div>
                <div class="creature-stats-window__proficiencies" id="proficiencies--${creature.index}"></div>
                <div class="creature-stats-window__vul-res" id="vul-res--${creature.index}"></div>
                <div class="creature-stats-window__senses" id="senses--${creature.index}"></div>
                <div class="creature-stats-window__languages">
                    <p>${creature.languages}</p>
                </div>
                <div class="creature-stats-window__body">
                    <p>Xp: ${creature.xp}</p>
                </div>
                <div class="creature-stats-window__special-abilities" id="special-abilities--${creature.index}"></div>
                <div class="creature-stats-window__actions" id="actions--${creature.index}"></div>
                <div class="creature-stats-window__legendary-actions" id="legendary-actions--${creature.index}"></div>
            </div>
        `);

        getCustomSpeedData();
        getCustomScoresData();
        getCustomProficiencyData();
        getCustomVulResData();
        getCustomSensesData();
        getCustomSpecialAbilityData();
        getCustomActionsData();
    } else {
        window.insertAdjacentHTML('beforeend', `
            <div class="creature-stats-content">
                <button class="btn--window-close" onclick="removeCreatureStatsWindow('${creature.index}')">X</button>
                <div class="creature-stats-window__header creature-stats-window--${creature.index}__header">
                    <h3>${creature.name}</h3>
                </div>
                <div class="creature-stats-window__body">
                    <p>${creature.size}, ${creature.type}, ${creature.alignment}</p>
                    <p>AC: ${creature.armor_class}</p>
                    <p>Health: ${creature.hit_points}, Hit dice: ${creature.hit_dice}</p>
                </div>
                <div class="creature-stats-window__speed" id="speed--${creature.index}"></div>
                <div class="creature-stats-window__scores" id="scores--${creature.index}"></div>
                <div class="creature-stats-window__proficiencies" id="proficiencies--${creature.index}"></div>
                <div class="creature-stats-window__vul-res" id="vul-res--${creature.index}"></div>
                <div class="creature-stats-window__senses" id="senses--${creature.index}"></div>
                <div class="creature-stats-window__languages">
                    <p>${creature.languages}</p>
                </div>
                <div class="creature-stats-window__body">
                    <p>Xp: ${creature.xp}</p>
                </div>
                <div class="creature-stats-window__special-abilities" id="special-abilities--${creature.index}"></div>
                <div class="creature-stats-window__actions" id="actions--${creature.index}"></div>
                <div class="creature-stats-window__legendary-actions" id="legendary-actions--${creature.index}"></div>
            </div>
        `);

        getCreatureSpeedData();
        getCreatureScoresData();
        getCreatureProficiencyData();
        getCreatureVulResData();
        getCreatureSensesData();
        getCreatureSpecialAbilityData();
        getCreatureActionsData();
        getCreatureLegActionsData();
    }
    dragElement(window, `creature-stats-window--${creature.index}`);
}

function removeCreatureStatsWindow(index) {
    for (let listItem of creatureIndexList) {
        if (listItem === index) {
            document.querySelector(`.creature-stats-window--${index}`).remove();         
            creatureIndexList.splice(creatureIndexList.indexOf(index), 1);
            return;
        }
    }   
}

// === Standard Creature Data === //

function getCreatureSpeedData() {
    let speeds = [];
    if (creature.speed.walk) speeds.push({name: 'Walk', value: creature.speed.walk});
    if (creature.speed.swim) speeds.push({name: 'Swim', value: creature.speed.swim});
    if (creature.speed.fly) speeds.push({name: 'Fly', value: creature.speed.fly});
    if (creature.speed.burrow) speeds.push({name: 'Burrow', value: creature.speed.burrow});
    if (creature.speed.hover) speeds.push({name: 'Hover', value: creature.speed.hover});
    if (creature.speed.climb) speeds.push({name: 'Climb', value: creature.speed.climb});

    for (let speed of speeds) {
        document.getElementById(`speed--${creature.index}`).insertAdjacentHTML('beforeend', `
            <p>${speed.name} ${speed.value}</p>
        `);
    }
}

function getCreatureScoresData() {
    let scoreNames = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Char'];
    let scoreValues = [
        creature.strength,
        creature.dexterity,
        creature.constitution,
        creature.intelligence,
        creature.wisdom,
        creature.charisma
    ];
    
    for (let i = 0; i < 6; i++) {
        let modifier = Math.floor((scoreValues[i] - 10) / 2);
        document.getElementById(`scores--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="creature-scores__box">
                <p>${scoreNames[i]}</p>
                <p>${scoreValues[i]}</p>
                <div class="creature-scores__modifier">
                    <p>${modifier < 0 ? '' : '+'}${modifier}</p>
                </div>
            </div>
        `);
    }
}

function getCreatureProficiencyData() {
    for (let proficiency of creature.proficiencies) {
        document.getElementById(`proficiencies--${creature.index}`).insertAdjacentHTML('beforeend', `
            <p>${proficiency.proficiency.name} ${proficiency.value}</p>
        `);
    }
}

function getCreatureVulResData() {
    // Vulnerabilities
    if (creature.damage_vulnerabilities.length > 0) {
        document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `<p class="vul-res__title">Vulnerabilities:</p>`);
        for (let stat of creature.damage_vulnerabilities) {
            document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `
                <p>${stat}</p>
            `);
        }
    }
    // Resistances
    if (creature.damage_resistances.length > 0) {
        document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `<p class="vul-res__title">Resistances:</p>`);
        for (let stat of creature.damage_resistances) {
            document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `
                <p>${stat}</p>
            `);
        }
    }
    // Damage immunities
    if (creature.damage_immunities.length > 0) {
        document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `<p class="vul-res__title">Damage Immunities:</p>`);
        for (let stat of creature.damage_immunities) {
            document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `
                <p>${stat}</p>
            `);
        }
    }
    // Condition immunities
    if (creature.condition_immunities.length > 0) {
        document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `<p class="vul-res__title">Condition Immunities:</p>`);
        for (let stat of creature.condition_immunities) {
            document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `
                <p>${stat.name}</p>
            `);
        }
    }
}

function getCreatureSensesData() {
    let senses = [];
    if (creature.senses.blindsight) senses.push({name: 'Blindsight', value: creature.senses.blindsight});
    if (creature.senses.darkvision) senses.push({name: 'Darkvision', value: creature.senses.darkvision});
    if (creature.senses.tremorsense) senses.push({name: 'Tremorsense', value: creature.senses.tremorsense});
    if (creature.senses.truesight) senses.push({name: 'Truesight', value: creature.senses.truesight});
    if (creature.senses.passive_perception) senses.push({name: 'Passive Perception', value: creature.senses.passive_perception});

    for (let sense of senses) {
        document.getElementById(`senses--${creature.index}`).insertAdjacentHTML('beforeend', `
            <p>${sense.name} ${sense.value}</p>
        `);
    }
}

function getCreatureSpecialAbilityData() {
    for (let ability of creature.special_abilities) {
        document.getElementById(`special-abilities--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="special-abilities__box">
                <p class="special-abilities__name">${ability.name}</p>
                <p class="special-abilities__desc">${ability.desc}</p>
            </div>
        `);
    }
}

function getCreatureActionsData() {
    for (let action of creature.actions) {
        document.getElementById(`actions--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="actions__box">
                <p class="actions__name">${action.name}</p>
                <p class="actions__desc">${action.desc}</p>
            </div>
        `);
    }
}

function getCreatureLegActionsData() {
    for (let action of creature.legendary_actions) {
        document.getElementById(`legendary-actions--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="actions__box">
                <p class="actions__name">${action.name}</p>
                <p class="actions__desc">${action.desc}</p>
            </div>
        `);
    }
}

// === Custom Creature Data === //

function getCustomSpeedData() {
    let speeds = [];
    for (let speed of creature.speeds) {
        if (speed.value !== null) {
            speeds.push(speed);
        }
    }

    for (let speed of speeds) {
        document.getElementById(`speed--${creature.index}`).insertAdjacentHTML('beforeend', `
            <p>${speed.name} ${speed.value} ft.</p>
        `);
    }
}

function getCustomScoresData() {
    let scoreNames = ['Str', 'Dex', 'Con', 'Int', 'Wis', 'Char'];
    let scoreValues = [
        creature.str,
        creature.dex,
        creature.con,
        creature.int,
        creature.wis,
        creature.char
    ];
    
    for (let i = 0; i < 6; i++) {
        let modifier = Math.floor((scoreValues[i] - 10) / 2);
        document.getElementById(`scores--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="creature-scores__box">
                <p>${scoreNames[i]}</p>
                <p>${scoreValues[i]}</p>
                <div class="creature-scores__modifier">
                    <p>${modifier < 0 ? '' : '+'}${modifier}</p>
                </div>
            </div>
        `);
    }
}

function getCustomProficiencyData() {
    for (let proficiency of creature.proficiencies) {
        document.getElementById(`proficiencies--${creature.index}`).insertAdjacentHTML('beforeend', `
            <p>${proficiency.name} ${proficiency.value}</p>
        `);
    }
}

function getCustomVulResData() {
    // Vulnerabilities
    if (creature.vulnerabilities.length > 0) {
        document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `<p class="vul-res__title">Vulnerabilities:</p>`);
        for (let stat of creature.vulnerabilities) {
            document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `
                <p>${stat}</p>
            `);
        }
    }
    // Resistances
    if (creature.resistances.length > 0) {
        document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `<p class="vul-res__title">Resistances:</p>`);
        for (let stat of creature.resistances) {
            document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `
                <p>${stat}</p>
            `);
        }
    }
    // Damage immunities
    if (creature.damageImmunities.length > 0) {
        document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `<p class="vul-res__title">Damage Immunities:</p>`);
        for (let stat of creature.damageImmunities) {
            document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `
                <p>${stat}</p>
            `);
        }
    }
    // Condition immunities
    if (creature.conditionImmunities.length > 0) {
        document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `<p class="vul-res__title">Condition Immunities:</p>`);
        for (let stat of creature.conditionImmunities) {
            document.getElementById(`vul-res--${creature.index}`).insertAdjacentHTML('beforeend', `
                <p>${stat}</p>
            `);
        }
    }
}

function getCustomSensesData() {
    for (let sense of creature.senses) {
        document.getElementById(`senses--${creature.index}`).insertAdjacentHTML('beforeend', `
            <p>${sense.name} ${sense.value} ft.</p>
        `);
    }
}

function getCustomSpecialAbilityData() {
    for (let ability of creature.abilities) {
        document.getElementById(`special-abilities--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="special-abilities__box">
                <p class="special-abilities__name">${ability.name}</p>
                <p class="special-abilities__desc">${ability.desc}</p>
            </div>
        `);
    }
}

function getCustomActionsData() {
    for (let action of creature.actions) {
        document.getElementById(`actions--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="actions__box">
                <p class="actions__name">${action.name}</p>
                <p class="actions__desc">${action.desc}</p>
            </div>
        `);
    }
}

function getCustomLegActionsData() {
    for (let action of creature.legendary_actions) {
        document.getElementById(`legendary-actions--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="actions__box">
                <p class="actions__name">${action.name}</p>
                <p class="actions__desc">${action.desc}</p>
            </div>
        `);
    }
}