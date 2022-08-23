let creatures = [];
let customCreatures = [];
let creaturesOpen = false;
let creatureFormOpen

function toggleCreaturesWindow() {
    creaturesOpen = !creaturesOpen;
    if (creaturesOpen) {
        const window = document.querySelector('body').appendChild(document.createElement('div'));
        window.classList.add('creatures-window');
        window.insertAdjacentHTML('beforeend', `
            <div class="creatures-content">
                <div class="creatures-window__header">
                    <h2>Creatures</h2>
                </div>
                <div class="creature-window__filters">
                    <label>
                        <select onchange="filterCreaturesList(event.target.value)">
                            <option value="all">All creatures</option>
                            <option value="standard">Standard</option>
                            <option value="custom">Custom</option>
                        </select>
                    </label>
                    <button class="btn--hover" onclick="toggleNewCreatureForm()">New Creature</button>
                </div>
                <div class="creatures-window__body"></div>
            </div>
        `);
        
        dragElement(window, 'creatures-window');
        getCreaturesBodyData();
    } else {
        document.querySelector('.creatures-window').remove();
    }
}

function filterCreaturesList(value) {
    document.querySelector('.creatures-window__body').innerHTML = '';
    switch (value) {
        case 'all':
            getCreaturesBodyData();
            break;
        case 'standard':
            getStandardCreaturesData();
            break;
        case 'custom':
            getCustomCreaturesData();
            break;
        default:
            break;
    }
}

async function getCreaturesBodyData() {
    await getCustomCreatures();
    for (let creature of creatures) {
        document.querySelector('.creatures-window__body').insertAdjacentHTML('beforeend', `
            <div class="creatures-window__item" onclick="openCreatureStatsWindow('${creature.index}')">
                <p>${creature.name}</p>
            </div>
        `);
    }
    for (let creature of customCreatures) {
        document.querySelector('.creatures-window__body').insertAdjacentHTML('beforeend', `
            <div class="creatures-window__item" onclick="openCreatureStatsWindow('${creature.index}', true)">
                <p>${creature.name}</p>
            </div>
        `); 
    }
}

async function getStandardCreaturesData() {
    for (let creature of creatures) {
        document.querySelector('.creatures-window__body').insertAdjacentHTML('beforeend', `
            <div class="creatures-window__item" onclick="openCreatureStatsWindow('${creature.index}')">
                <p>${creature.name}</p>
            </div>
        `);
    }
}

async function getCustomCreaturesData() {
    await getCustomCreatures();
    for (let creature of customCreatures) {
        document.querySelector('.creatures-window__body').insertAdjacentHTML('beforeend', `
            <div class="creatures-window__item" onclick="openCreatureStatsWindow('${creature.index}', true)">
                <p>${creature.name}</p>
            </div>
        `);
    }
}

function toggleNewCreatureForm() {
    creatureFormOpen = !creatureFormOpen;
    if (creatureFormOpen) {
        const window = document.querySelector('body').appendChild(document.createElement('div'));
        window.classList.add('creatures-window-form');
        window.insertAdjacentHTML('beforeend', `
            <div class="creatures-content">
                <div class="creatures-window-form__header">
                    <h2>New Creature</h2>
                </div>
                <form class="creatures-window-form__body">
                    <label>Token
                        <input type="file">
                    </label>
                    <div class="creatures-window-form__body--box">
                        <label>Name
                            <input required>
                        </label>
                        <label>Size
                            <select>
                                <option value="tiny">Tiny</option>
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="">Large</option>
                                <option value="">Huge</option>
                                <option value="">Gargantuan</option>
                            </select>
                        </label>
                        <label>Type
                            <input class="input--md">
                        </label>
                        <label>Alignment
                            <input class="input--sm">
                        </label>
                        <label>AC
                            <input class="input--sm" type="number">
                        </label>
                        <label>Hit Points
                            <input class="input--sm" type="number">
                        </label>
                        <label>Hit Dice
                            <input class="input--sm">
                        </label>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <div>
                            <div class="form__input-add form__input-add--speed">
                                <label>Movement
                                    <div class="flex-container">
                                        <input placeholder="Walk" class="input--md creature-inputs__speed-name">
                                        <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value">
                                    </div>
                                </label>
                            </div>
                            <button type="button" onclick="addInputs('speed')" class="creature-form__btn--input">Add speed</button>
                        </div>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <label>Str
                            <input class="input--sm" type="number">
                        </label>
                        <label>Dex
                            <input class="input--sm" type="number">
                        </label>
                        <label>Con
                            <input class="input--sm" type="number">
                        </label>
                        <label>Int
                            <input class="input--sm" type="number">
                        </label>
                        <label>Wis
                            <input class="input--sm" type="number">
                        </label>
                        <label>Char
                            <input class="input--sm" type="number">
                        </label>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <div>
                            <div class="form__input-add form__input-add--proficiency">
                                <label>Proficiencies
                                    <div class="flex-container">
                                        <input placeholder="Perception" class="input--md creature-inputs__speed-name">
                                        <input placeholder="6" type="number" class="input--sm creature-inputs__speed-value">
                                    </div>
                                </label>
                            </div>
                            <button type="button" onclick="addInputs('proficiency')" class="creature-form__btn--input">Add proficiency</button>
                        </div>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <label>Vulnerabilities
                            <textarea rows="3" cols="40" placeholder="fire, thunder"></textarea>
                        </label>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <label>Resistances
                            <textarea rows="3" cols="40" placeholder="poison, bludgeoning"></textarea>
                        </label>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <label>Damage Immunities
                            <textarea rows="3" cols="40" placeholder="nonmagical slashing"></textarea>
                        </label>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <label>Condition Immunities
                            <textarea rows="3" cols="40" placeholder="prone, restrained"></textarea>
                        </label>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <div>
                            <div class="form__input-add form__input-add--sense">
                                <label>Senses
                                    <div class="flex-container">
                                        <input placeholder="Darkvision" class="input--md creature-inputs__speed-name">
                                        <input placeholder="60" type="number" class="input--sm creature-inputs__speed-value">
                                    </div>
                                </label>
                            </div>
                            <button type="button" onclick="addInputs('sense')" class="creature-form__btn--input">Add sense</button>
                        </div>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <label>Languages
                            <textarea rows="3" cols="40"></textarea>
                        </label>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <label>CR
                            <input type="number" class="input--sm">
                        </label>
                        <label>XP
                            <input type="number" class="input--sm">
                        </label>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <div>
                            <div class="form__input-add form__input-add--ability">
                                <label>Special Abilities
                                    <input placeholder="Ability name" class="input--md creature-inputs__speed-name">
                                    <textarea rows="3" cols="40" placeholder="description"></textarea>
                                </label>
                            </div>
                            <button type="button" onclick="addDescInputs('ability')" class="creature-form__btn--input">Add ability</button>
                        </div>
                    </div>
                </form>
            </div>
        `);
        
        dragElement(window, 'creatures-window-form');
    } else {
        document.querySelector('.creatures-window-form').remove();
    }
}

function addInputs(_name) {
    document.querySelector(`.form__input-add--${_name}`).insertAdjacentHTML('beforeend', `
        <div class="flex-container">
            <input placeholder="name" class="input--md creature-inputs__speed-name">
            <input placeholder="value" type="number" class="input--sm creature-inputs__speed-value">
            <button type="button" onclick="this.parentNode.remove()" class="form__btn--remove">X</button>
        </div>
    `);
}

function addDescInputs(_name) {
    document.querySelector(`.form__input-add--${_name}`).insertAdjacentHTML('beforeend', `
        <br/>
        <label>
            <div class="flex-container">
                <input placeholder="Ability name" class="input--md creature-inputs__speed-name">
                <button type="button" onclick="this.parentNode.remove()" class="form__btn--remove">X</button>
            </div>
            <textarea rows="3" cols="40" placeholder="description"></textarea>
        </label>
    `);
}