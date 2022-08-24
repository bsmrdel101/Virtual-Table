let creatures = [];
let customCreatures = [];
let creaturesOpen = false;
let creatureFormOpen

// Form data
let creatureFormName, creatureFormSize = "medium", creatureFormType, creatureFormAlignment, creatureFormAc, creatureFormHitPoints, creatureFormHitDice, creatureFormStr, creatureFormDex, creatureFormCon, creatureFormInt, creatureFormWis, creatureFormChar, creatureFormVul, creatureFormRes, creatureFormDmgImmune, creatureFormConImmune, creatureFormLanguages, creatureFormCr, creatureFormXp;

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
                <form class="creatures-window-form__body" onsubmit="submitCreatureForm(event)">
                    <label>Token
                        <input type="file">
                    </label>
                    <div class="creatures-window-form__body--box">
                        <label>Name
                            <input required onchange="creatureFormName = event.target.value">
                        </label>
                        <label>Size
                            <select onchange="creatureFormSize = event.target.value">
                                <option value="tiny">Tiny</option>
                                <option value="small">Small</option>
                                <option value="medium" selected>Medium</option>
                                <option value="large">Large</option>
                                <option value="huge">Huge</option>
                                <option value="gargantuan">Gargantuan</option>
                            </select>
                        </label>
                        <label>Type
                            <input class="input--md" onchange="creatureFormType = event.target.value">
                        </label>
                        <label>Alignment
                            <input class="input--sm" onchange="creatureFormAlignment = event.target.value">
                        </label>
                        <label>AC
                            <input class="input--sm" type="number" onchange="creatureFormAc = event.target.value">
                        </label>
                        <label>Hit Points
                            <input class="input--sm" type="number" onchange="creatureFormHitPoints = event.target.value">
                        </label>
                        <label>Hit Dice
                            <input class="input--sm" onchange="creatureFormHitDice = event.target.value">
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
                            <input class="input--sm" type="number" onchange="creatureFormStr = event.target.value">
                        </label>
                        <label>Dex
                            <input class="input--sm" type="number" onchange="creatureFormDex = event.target.value">
                        </label>
                        <label>Con
                            <input class="input--sm" type="number" onchange="creatureFormCon = event.target.value">
                        </label>
                        <label>Int
                            <input class="input--sm" type="number" onchange="creatureFormInt = event.target.value">
                        </label>
                        <label>Wis
                            <input class="input--sm" type="number" onchange="creatureFormWis = event.target.value">
                        </label>
                        <label>Char
                            <input class="input--sm" type="number" onchange="creatureFormChar = event.target.value">
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
                            <textarea rows="3" cols="40" placeholder="fire, thunder" onchange="creatureFormVul = event.target.value"></textarea>
                        </label>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <label>Resistances
                            <textarea rows="3" cols="40" placeholder="poison, bludgeoning" onchange="creatureFormRes = event.target.value"></textarea>
                        </label>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <label>Damage Immunities
                            <textarea rows="3" cols="40" placeholder="nonmagical slashing" onchange="creatureFormDmgImmune = event.target.value"></textarea>
                        </label>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <label>Condition Immunities
                            <textarea rows="3" cols="40" placeholder="prone, restrained" onchange="creatureFormConImmune = event.target.value"></textarea>
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
                            <textarea rows="3" cols="40" onchange="creatureFormLanguages = event.target.value"></textarea>
                        </label>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <label>CR
                            <input type="number" class="input--sm" onchange="creatureFormCr = event.target.value">
                        </label>
                        <label>XP
                            <input type="number" class="input--sm" onchange="creatureFormXp = event.target.value">
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
                    <div class="creatures-window-form__body--box">
                        <div>
                            <div class="form__input-add form__input-add--action">
                                <label>Actions
                                    <input placeholder="Action name" class="input--md creature-inputs__speed-name">
                                    <textarea rows="3" cols="40" placeholder="description"></textarea>
                                </label>
                            </div>
                            <button type="button" onclick="addDescInputs('action')" class="creature-form__btn--input">Add action</button>
                        </div>
                    </div>
                    <div class="creatures-window-form__body--box">
                        <div>
                            <div class="form__input-add form__input-add--leg-action">
                                <label>Legendary Actions
                                    <input placeholder="Action name" class="input--md creature-inputs__speed-name">
                                    <textarea rows="3" cols="40" placeholder="description"></textarea>
                                </label>
                            </div>
                            <button type="button" onclick="addDescInputs('leg-action')" class="creature-form__btn--input">Add Legendary action</button>
                        </div>
                    </div>
                    <br/>
                    <button type="submit">Add Creature</button>
                </form>
            </div>
        `);
        
        dragElement(window, 'creatures-window-form');
    } else {
        document.querySelector('.creatures-window-form').remove();
    }
}

// Adds two inputs when user clicks a button
function addInputs(_name) {
    document.querySelector(`.form__input-add--${_name}`).insertAdjacentHTML('beforeend', `
        <div class="flex-container">
            <input placeholder="name" class="input--md creature-inputs__speed-name">
            <input placeholder="value" type="number" class="input--sm creature-inputs__speed-value">
            <button type="button" onclick="this.parentNode.remove()" class="form__btn--remove">X</button>
        </div>
    `);
}

// Adds an input and textarea when user clicks a button
function addDescInputs(_name) {
    document.querySelector(`.form__input-add--${_name}`).insertAdjacentHTML('beforeend', `
        <label>
            <br/>
            <div class="flex-container">
                <input placeholder="Ability name" class="input--md creature-inputs__speed-name">
                <button type="button" onclick="this.parentNode.parentNode.remove()" class="form__btn--remove">X</button>
            </div>
            <textarea rows="3" cols="40" placeholder="description"></textarea>
        </label>
    `);
}

function submitCreatureForm(e) {
    e.preventDefault();
    let speeds = [];

    let speedInputs = document.getElementsByClassName('creature-inputs__speed-name');

    for (let i = 0; i < speedInputs.length; i++) {
        console.log(speedInputs[i]);
    }

    const newCreature = new CreatureFormData(creatureFormName, creatureFormSize, creatureFormType, creatureFormAlignment, creatureFormAc, creatureFormHitPoints, creatureFormHitDice, creatureFormStr, creatureFormDex, creatureFormCon, creatureFormInt, creatureFormWis, creatureFormChar, creatureFormVul, creatureFormRes, creatureFormDmgImmune, creatureFormConImmune, creatureFormLanguages, creatureFormCr, creatureFormXp);
}

// Holds creature form data
class CreatureFormData {
    #name;
    #size;
    #type;
    #alignment;
    #ac;
    #hp;
    #hitDice;
    #str;
    #dex;
    #con;
    #int;
    #wis;
    #char;
    #vul;
    #res;
    #dmgImmune;
    #conImmune;
    #languages;
    #cr;
    #xp;

    constructor(name, size, type, alignment, ac, hp, hitDice, str, dex, con, int, wis, char, vul, res, dmgImmune, conImmune, languages, cr, xp) {
        this.#name = name;
        this.#size = size;
        this.#type = type;
        this.#alignment = alignment;
        this.#ac = ac;
        this.#hp = hp;
        this.#hitDice = hitDice;
        this.#str = str;
        this.#dex = dex;
        this.#con = con;
        this.#int = int;
        this.#wis = wis;
        this.#char = char;
        this.#vul = vul;
        this.#res = res;
        this.#dmgImmune = dmgImmune;
        this.#conImmune = conImmune;
        this.#languages = languages;
        this.#cr = cr;
        this.#xp = xp;
    }
}