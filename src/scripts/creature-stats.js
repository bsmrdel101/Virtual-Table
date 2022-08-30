let creature;
let creatureIndexList = [];
let canOpenStats = true;

async function openCreatureStatsWindow(index, custom) {
    // Check if a creature's stats are already open
    // If they are open the close the window instead
    for (let listItem of creatureIndexList) {
        if (listItem === index) {
            if (document.querySelector(`.creature-stats-window--${index}`)) document.querySelector(`.creature-stats-window--${index}`).remove();         
            creatureIndexList.splice(creatureIndexList.indexOf(index), 1);
            return;
        }
    }
    // creatureIndexList.forEach((listItem) => {
    //     if (listItem === index) {
    //         if (document.querySelector(`.creature-stats-window--${index}`)) document.querySelector(`.creature-stats-window--${index}`).remove();         
    //         creatureIndexList.splice(creatureIndexList.indexOf(index), 1);
    //         return;
    //     }
    // });


    creatureIndexList.push(index);
    // Get data for selected creature
    creature = await getSpecificCreature(index, custom);

    const window = document.querySelector('body').appendChild(document.createElement('div'));
    window.classList.add('creature-stats-window');
    window.classList.add(`creature-stats-window--${creature.index}`);
    if (custom) {
        // Render custom creature
        window.insertAdjacentHTML('beforeend', `
            <div class="creature-stats-content">
                <button class="btn--window-close" onclick="removeCreatureStatsWindow('${creature.index}')">X</button>
                <div class="creature-stats-window__header creature-stats-window--${creature.index}__header">
                    <h3>${creature.name}</h3>
                    <p>${creature.size ? `${creature.size} ` : ''}${creature.type ? creature.type : ''}, ${creature.alignment ? creature.alignment: ''}</p>
                </div>
                <div class="creature-stats-window__body">
                    <p><span class="bold">Armor Class</span> ${creature.ac}</p>
                    <p><span class="bold">Health</span> ${creature.hit_points} ${creature.hit_dice ? `(${creature.hit_dice})` : ''}</p>
                    <div class="creature-stats-window__speed" id="speed--${creature.index}"></div>
                <div class="creatures-window__body--general-stats">
                    <div class="creature-stats-window__scores" id="scores--${creature.index}"></div>
                    <div class="creature-stats-window__proficiencies" id="proficiencies--${creature.index}"></div>
                    <div class="creature-stats-window__proficiencies" id="skills--${creature.index}"></div>
                    <div class="creature-stats-window__vul-res" id="vul-res--${creature.index}"></div>
                    <div class="creature-stats-window__senses" id="senses--${creature.index}"></div>
                    <div class="creature-stats-window__languages">
                        ${creature.languages.length > 0 ? `<p><span class="bold">Languages</span> ${creature.languages}</p>` : ``}
                    </div>
                    <div class="creature-stats-window__body">
                        <p><span class="bold">Challenge</span> ${creature.cr ? creature.cr : '-'} (${creature.xp ? creature.xp : 0} XP)</p>
                    </div>
                </div>
                <div class="creature-stats-window__special-abilities" id="special-abilities--${creature.index}"></div>
                ${creature.actions.length > 0 ? `<div class="creatures-window__body--actions">
                    <h4>Actions</h4>
                    <div class="creature-stats-window__actions" id="actions--${creature.index}"></div>
                </div>` : ''}
                ${creature.legActions.length > 0 ? `<div class="creatures-window__body--actions">
                    <h4>Legendary Actions</h4>
                    <div class="creature-stats-window__legendary-actions" id="legendary-actions--${creature.index}"></div>
                </div>` : ''}
            </div>
        `);

        // Populate body data
        getCustomSpeedData();
        getCustomScoresData();
        getCustomProficiencyData();
        getCustomVulResData();
        getCustomSensesData();
        getCustomSpecialAbilityData();
        getCustomActionsData();
        getCustomLegActionsData();
    } else {
        // Render standard creature
        window.insertAdjacentHTML('beforeend', `
            <div class="creature-stats-content">
                <button class="btn--window-close" onclick="removeCreatureStatsWindow('${creature.index}')">X</button>
                <div class="creature-stats-window__header creature-stats-window--${creature.index}__header">
                    <h3>${creature.name}</h3>
                    <p>${creature.size} ${creature.type}, ${creature.alignment}</p>
                </div>
                <div class="creature-stats-window__body creatures-window__body--general-stats">
                    <p><span class="bold">Armor Class</span> ${creature.armor_class}</p>
                    <p><span class="bold">Health</span> ${creature.hit_points} (${creature.hit_dice})</p>
                    <div class="creature-stats-window__speed" id="speed--${creature.index}"></div>
                </div>
                <div class="creatures-window__body--general-stats">
                    <div class="creature-stats-window__scores" id="scores--${creature.index}"></div>
                    <div class="creature-stats-window__proficiencies" id="proficiencies--${creature.index}"></div>
                    <div class="creature-stats-window__proficiencies" id="skills--${creature.index}"></div>
                    <div class="creature-stats-window__vul-res" id="vul-res--${creature.index}"></div>
                    <div class="creature-stats-window__senses" id="senses--${creature.index}"></div>
                    <div class="creature-stats-window__languages">
                        <p><span class="bold">Languages</span> ${creature.languages}</p>
                    </div>
                    <div class="creature-stats-window__body">
                        <p><span class="bold">Challenge</span> ${creature.challenge_rating} (${creature.xp} XP)</p>
                    </div>
                </div>
                <div class="creature-stats-window__special-abilities" id="special-abilities--${creature.index}"></div>
                ${creature.actions.length > 0 ? `<div class="creatures-window__body--actions">
                    <h4>Actions</h4>
                    <div class="creature-stats-window__actions" id="actions--${creature.index}"></div>
                </div>` : ''}
                ${creature.legendary_actions.length > 0 ? `<div class="creatures-window__body--actions">
                    <h4>Legendary Actions</h4>
                    <div class="creature-stats-window__legendary-actions" id="legendary-actions--${creature.index}"></div>
                </div>` : ''}
            </div>
        `);

        // Populate body data
        getCreatureSpeedData();
        getCreatureScoresData();
        getCreatureProficiencyData();
        getCreatureVulResData();
        getCreatureSensesData();
        getCreatureSpecialAbilityData();
        getCreatureActionsData();
        getCreatureLegActionsData();
    }
    // Make this window draggable
    dragElement(window, `creature-stats-window--${creature.index}`);
}

// Remove a specific creature window
function removeCreatureStatsWindow(index) {
    creatureIndexList.forEach((listItem) => {
        if (listItem === index) {
            document.querySelector(`.creature-stats-window--${index}`).remove();         
            creatureIndexList.splice(creatureIndexList.indexOf(index), 1);
            return;
        }
    });
}

// Separates the string for skills/saving throws and splits them into their name and value 
function separateProf(string, value) {
    const save = string.split('Saving Throw: ');
    const skill = string.split('Skill: ');
    
    if (save[0] === '') {
        const name = save[1].split(value);
        return name[0].toString()
    } else {
        const name = skill[1].split(value);
        return name[0].toString()
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

    const text = document.getElementById(`speed--${creature.index}`).appendChild(document.createElement('p'));
    text.insertAdjacentHTML('beforeend', `<span class="bold">Speed </span>`);
    speeds.forEach((speed) => {
        text.insertAdjacentHTML('beforeend', `
            ${speed.name} ${speed.value},
        `);
    });
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
                <span class="bold"><p>${scoreNames[i]}</p></span>
                <p>${modifier < 0 ? '' : '+'}${modifier}</p>
                <div class="creature-scores__modifier">
                    <p>${scoreValues[i]}</p>
                </div>
            </div>
        `);
    }
}

function getCreatureProficiencyData() {
    const text = document.getElementById(`proficiencies--${creature.index}`).appendChild(document.createElement('p'));
    text.insertAdjacentHTML('beforeend',`<span class="bold">Saving Throws </span>`);
    let skills = [];
    let string = '';

    creature.proficiencies.forEach((proficiency) => {
        const modifiedProf = separateProf(proficiency.proficiency.name + proficiency.value, proficiency.value);
        if (proficiency.proficiency.name.includes('Saving')) {
            string += ` ${modifiedProf} +${proficiency.value},`;
        } else {
            skills.push({name: modifiedProf, value: proficiency.value});
        }
    });
    string = string.replace(/,*$/, '');
    text.insertAdjacentHTML('beforeend', string);
    // If there are no saves, remove the section
    if (string === '') text.remove();

    string = '';
    const skillsText = document.getElementById(`skills--${creature.index}`).appendChild(document.createElement('p'));
    skillsText.insertAdjacentHTML('beforeend',`<span class="bold">Skills </span>`);
    skills.forEach((skill) => {
        string += ` ${skill.name} +${skill.value},`;
    });
    string = string.replace(/,*$/, '');
    skillsText.insertAdjacentHTML('beforeend', string);
    // If there are no skills, remove the section
    if (string === '') skillsText.remove();
}

function getCreatureVulResData() {
    // Vulnerabilities
    if (creature.damage_vulnerabilities.length > 0) {
        const text = document.getElementById(`vul-res--${creature.index}`).appendChild(document.createElement('p'));
        text.insertAdjacentHTML('beforeend',`<span class="bold">Vulnerabilities </span>`);
        let string = '';

        creature.damage_vulnerabilities.forEach((stat) => {
            string += ` ${stat.name},`;
        });
        string = string.replace(/,*$/, '');
        text.insertAdjacentHTML('beforeend', string);
    }

    // Resistances
    if (creature.damage_resistances.length > 0) {
        const text = document.getElementById(`vul-res--${creature.index}`).appendChild(document.createElement('p'));
        text.insertAdjacentHTML('beforeend',`<span class="bold">Resistances </span>`);
        let string = '';

        creature.damage_resistances.forEach((stat) => {
            string += ` ${stat.name},`;
        });
        string = string.replace(/,*$/, '');
        text.insertAdjacentHTML('beforeend', string);
    }

    // Damage immunities
    if (creature.damage_immunities.length > 0) {
        const text = document.getElementById(`vul-res--${creature.index}`).appendChild(document.createElement('p'));
        text.insertAdjacentHTML('beforeend',`<span class="bold">Damage Immunities </span>`);
        let string = '';

        creature.damage_immunities.forEach((stat) => {
            string += ` ${stat.name},`;
        });
        string = string.replace(/,*$/, '');
        text.insertAdjacentHTML('beforeend', string);
    }

    // Condition immunities
    if (creature.condition_immunities.length > 0) {
        const text = document.getElementById(`vul-res--${creature.index}`).appendChild(document.createElement('p'));
        text.insertAdjacentHTML('beforeend',`<span class="bold">Condition Immunities </span>`);
        let string = '';

        creature.condition_immunities.forEach((stat) => {
            string += ` ${stat.name},`;
        });
        string = string.replace(/,*$/, '');
        text.insertAdjacentHTML('beforeend', string);
    }
}

function getCreatureSensesData() {
    let senses = [];
    if (creature.senses.blindsight) senses.push({name: 'Blindsight', value: creature.senses.blindsight});
    if (creature.senses.darkvision) senses.push({name: 'Darkvision', value: creature.senses.darkvision});
    if (creature.senses.tremorsense) senses.push({name: 'Tremorsense', value: creature.senses.tremorsense});
    if (creature.senses.truesight) senses.push({name: 'Truesight', value: creature.senses.truesight});
    if (creature.senses.passive_perception) senses.push({name: 'Passive Perception', value: creature.senses.passive_perception});

    const text = document.getElementById(`senses--${creature.index}`).appendChild(document.createElement('p'));
    text.insertAdjacentHTML('beforeend',`<span class="bold">Senses </span>`);
    let string = '';

    senses.forEach((sense) => {
        string += ` ${sense.name} ${sense.value},`;
    });
    string = string.replace(/,*$/, '');
    text.insertAdjacentHTML('beforeend', string);
}

function getCreatureSpecialAbilityData() {
    creature.special_abilities.forEach((ability) => {
        document.getElementById(`special-abilities--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="special-abilities__box">
                <p class="special-abilities__name"><span class="bold">${ability.name}.</span> ${ability.desc}</p>
            </div>
        `);
    });
}

function getCreatureActionsData() {
    let i = 0;
    creature.actions.forEach((action) => {
        document.getElementById(`actions--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="actions__box">
                <p class="actions__name"><span class="bold">${action.name}.</span> ${action.desc}</p>
                ${action.attack_bonus ? `<button class="btn--attack btn--hover"><i class="fa-solid fa-dice-d20"></i>+${action.attack_bonus}</button>` : ''}
                <span id="${creature.index}-${action.name}-${i}"></span>
            </div>
        `);
        i++;
    });

    i = 0;
    creature.actions.forEach((action) => {
        let element = document.getElementById(`${creature.index}-${action.name}-${i}`);
        element.classList.add('actions__box--dmg_dice');

        if (action.damage) {
            action.damage.forEach((dmg) => {
                if (dmg.damage_type) {
                    element.insertAdjacentHTML('beforeend', `<button class="btn--attack btn--hover">${dmg.damage_dice} ${dmg.damage_type.index}</button>`);
                } else if (dmg.from) {
                    dmg.from.options.forEach((option) => {
                        element.insertAdjacentHTML('beforeend', `<button class="btn--attack btn--hover">${option.notes ? option.notes : ''} ${option.damage_dice} ${option.damage_type.index}</button>`);
                    });
                } 
            });
        }
        i++;
    });
}

function getCreatureLegActionsData() {
    let i = 0;
    creature.legendary_actions.forEach((action) => {
        document.getElementById(`legendary-actions--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="actions__box">
                <p class="actions__name"><span class="bold">${action.name}.</span> ${action.desc}</p>
                ${action.attack_bonus ? `<button class="btn--attack btn--hover"><i class="fa-solid fa-dice-d20"></i>+${action.attack_bonus}</button>` : ''}
                <span id="${creature.index}-${action.name}-${i}"></span>
            </div>
        `);
        i++;
    });

    i = 0;
    creature.legendary_actions.forEach((action) => {
        let element = document.getElementById(`${creature.index}-${action.name}-${i}`);
        element.classList.add('actions__box--dmg_dice');

        if (action.damage) {
            action.damage.forEach((dmg) => {
                if (dmg.damage_type) {
                    element.insertAdjacentHTML('beforeend', `<button class="btn--attack btn--hover">${dmg.damage_dice} ${dmg.damage_type.index}</button>`);
                } else if (dmg.from) {
                    dmg.from.options.forEach((option) => {
                        element.insertAdjacentHTML('beforeend', `<button class="btn--attack btn--hover">${option.notes ? option.notes : ''} ${option.damage_dice} ${option.damage_type.index}</button>`);  
                    });
                }
            });
        }
        i++;
    });
}

// === Custom Creature Data === //

function getCustomSpeedData() {
    let speeds = [];
    creature.speeds.forEach((speed) => {
        if (speed.value !== null) {
            speeds.push(speed);
        }
    })

    const text = document.getElementById(`speed--${creature.index}`).appendChild(document.createElement('p'));
    text.insertAdjacentHTML('beforeend', `<span class="bold">Speed </span>`);
    speeds.forEach((speed) => {
        text.insertAdjacentHTML('beforeend', `
            ${speed.name} ${speed.value} ft.,
        `);
    });
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
                <span class="bold"><p>${scoreNames[i]}</p></span>
                <p>${modifier < 0 ? '' : '+'}${modifier}</p>
                <div class="creature-scores__modifier">
                    <p>${scoreValues[i]}</p>
                </div>
            </div>
        `);
    }
}

function getCustomProficiencyData() {
    const text = document.getElementById(`proficiencies--${creature.index}`).appendChild(document.createElement('p'));
    text.insertAdjacentHTML('beforeend',`<span class="bold">Saving Throws </span>`);
    let skills = [];
    let string = '';

    creature.proficiencies.forEach((proficiency) => {
        const modifiedProf = separateProf(proficiency.name + proficiency.value, proficiency.value);
        if (proficiency.name.includes('Saving')) {
            string += ` ${modifiedProf} +${proficiency.value},`;
        } else {
            skills.push({name: modifiedProf, value: proficiency.value});
        }
    });
    string = string.replace(/,*$/, '');
    text.insertAdjacentHTML('beforeend', string);
    // If there are no saves, remove the section
    if (string === '') text.remove();

    string = '';
    const skillsText = document.getElementById(`skills--${creature.index}`).appendChild(document.createElement('p'));
    skillsText.insertAdjacentHTML('beforeend',`<span class="bold">Skills </span>`);
    skills.forEach((skill) => {
        string += ` ${skill.name} +${skill.value},`;
    });
    string = string.replace(/,*$/, '');
    skillsText.insertAdjacentHTML('beforeend', string);
    // If there are no skills, remove the section
    if (string === '') skillsText.remove();
}

function getCustomVulResData() {
    // Vulnerabilities
    if (creature.vulnerabilities.length > 0) {
        const text = document.getElementById(`vul-res--${creature.index}`).appendChild(document.createElement('p'));
        text.insertAdjacentHTML('beforeend',`<span class="bold">Vulnerabilities </span>`);
        let string = '';

        creature.vulnerabilities.forEach((stat) => {
            string += ` ${stat},`;
        });
        string = string.replace(/,*$/, '');
        text.insertAdjacentHTML('beforeend', string);
    }

    // Resistances
    if (creature.resistances.length > 0) {
        const text = document.getElementById(`vul-res--${creature.index}`).appendChild(document.createElement('p'));
        text.insertAdjacentHTML('beforeend',`<span class="bold">Resistances </span>`);
        let string = '';

        creature.resistances.forEach((stat) => {
            string += ` ${stat},`;
        });
        string = string.replace(/,*$/, '');
        text.insertAdjacentHTML('beforeend', string);
    }

    // Damage immunities
    if (creature.damageImmunities.length > 0) {
        const text = document.getElementById(`vul-res--${creature.index}`).appendChild(document.createElement('p'));
        text.insertAdjacentHTML('beforeend',`<span class="bold">Damage Immunities </span>`);
        let string = '';

        creature.damageImmunities.forEach((stat) => {
            string += ` ${stat},`;
        });
        string = string.replace(/,*$/, '');
        text.insertAdjacentHTML('beforeend', string);
    }

    // Condition immunities
    if (creature.conditionImmunities.length > 0) {
        const text = document.getElementById(`vul-res--${creature.index}`).appendChild(document.createElement('p'));
        text.insertAdjacentHTML('beforeend',`<span class="bold">Condition Immunities </span>`);
        let string = '';

        creature.conditionImmunities.forEach((stat) => {
            string += ` ${stat},`;
        });
        string = string.replace(/,*$/, '');
        text.insertAdjacentHTML('beforeend', string);
    }
}

function getCustomSensesData() {
    const text = document.getElementById(`senses--${creature.index}`).appendChild(document.createElement('p'));
    text.insertAdjacentHTML('beforeend',`<span class="bold">Senses </span>`);
    let string = '';

    creature.senses.forEach((sense) => {
        if (sense.name.includes('passive') || sense.name.includes('Passive')) {
            string += ` ${sense.name} ${sense.value},`;
        } else {
            string += ` ${sense.name} ${sense.value} ft.,`;
        }
    });
    string = string.replace(/,*$/, '');
    text.insertAdjacentHTML('beforeend', string);
}

function getCustomSpecialAbilityData() {
    creature.abilities.forEach((ability) => {
        document.getElementById(`special-abilities--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="special-abilities__box">
                <p class="special-abilities__name"><span class="bold">${ability.name}.</span> ${ability.desc}</p>
            </div>
        `);
    });
}

function getCustomActionsData() {
    let i = 0;
    creature.actions.forEach((action) => {
        const { desc, toHit } = getActionDesc(action.desc);

        document.getElementById(`actions--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="actions__box">
                <p class="actions__name"><span class="bold">${action.name}.</span> ${desc}</p>
                ${toHit ? `<button class="btn--attack btn--hover"><i class="fa-solid fa-dice-d20"></i>${toHit}</button>` : ''}
                <span id="${creature.index}-${action.name}-${i}"></span>
            </div>
        `);
        i++;
    });

    i = 0;
    creature.actions.forEach((action) => {
        const { rolls } = getActionDesc(action.desc);
        let element = document.getElementById(`${creature.index}-${action.name}-${i}`);

        element.classList.add('actions__box--dmg_dice');

        rolls.forEach((dmg) => {
            damage = separateDmgRoll(dmg);
            element.insertAdjacentHTML('beforeend', `<button class="btn--attack btn--hover">${damage.damageDice} ${damage.damageType}</button>`);
        });
        i++;
    });
}

function getCustomLegActionsData() {
    let i = 0;
    creature.legActions.forEach((action) => {
        const { desc, toHit } = getActionDesc(action.desc);

        document.getElementById(`legendary-actions--${creature.index}`).insertAdjacentHTML('beforeend', `
            <div class="actions__box">
                <p class="actions__name"><span class="bold">${action.name}.</span> ${desc}</p>
                ${toHit ? `<button class="btn--attack btn--hover"><i class="fa-solid fa-dice-d20"></i>${toHit}</button>` : ''}
                <span id="${creature.index}-${action.name}-${i}"></span>
            </div>
        `);
        i++;
    });

    i = 0;
    creature.legActions.forEach((action) => {
        const { rolls } = getActionDesc(action.desc);
        let element = document.getElementById(`${creature.index}-${action.name}-${i}`);
        
        element.classList.add('legendary-actions__box--dmg_dice');

        rolls.forEach((dmg) => {
            const { damageDice, damageType }  = separateDmgRoll(dmg);
            element.insertAdjacentHTML('beforeend', `<button class="btn--attack btn--hover">${damageDice} ${damageType}</button>`);
        });
        i++;
    });
}

// Returns a string without the square brackets, and array with action rolls
function getActionDesc(_string) {
    let string = _string
    let rolls = [];
    let toHit;

    // Checks if there is an attack bonus
    while (string.includes('{{')) {
        toHit = string.split('{{')[1].split('}}')[0];
        string = string.replace('{{', '').replace('}}', '');
    }

    // Modifies string to get dmg rolls, and description with the brackets
    while (string.includes('[[')) {
        rolls.push(string.split('[[')[1].split(']]')[0]);
        string = string.replace('[[', '').replace(']]', '');
    }
    return {rolls: rolls, desc: string, toHit: toHit};
}

// Splits and returns an attack damage rolls
function separateDmgRoll(dmg) {
    const [ damageDice, damageType ] = dmg.split(' ');
    return { damageDice, damageType };
}