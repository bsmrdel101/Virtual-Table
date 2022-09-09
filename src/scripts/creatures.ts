import { dragElement, disableHotkeys, indexConverter } from './utils';
import { getCustomCreatures, addCreature } from './routes/creatures.route';
import { openCreatureStatsWindow } from './creature-stats';

export let creatures: any = {value: []};
export let customCreatures: any = {value: []};
export let creaturesOpen: boolean = false;
let creatureFormOpen: boolean;

// Form data
let creatureFormName: string, creatureFormSize: string = "medium", creatureFormType: string, creatureFormAlignment: string, creatureFormAc: number, creatureFormHitPoints: number, creatureFormHitDice: string, creatureFormStr, creatureFormDex: number, creatureFormCon: number, creatureFormInt: number, creatureFormWis: number, creatureFormChar: number, creatureFormVul: string, creatureFormRes: string, creatureFormDmgImmune: string, creatureFormConImmune: string, creatureFormLanguages: string, creatureFormCr: number, creatureFormXp: number, creatureFormWalk: number, creatureFormSwim: number, creatureFormBurrow: number, creatureFormFly: number, creatureFormClimb: number;

export function toggleCreaturesWindow() {
    creaturesOpen = !creaturesOpen;
    if (creaturesOpen) {
        renderCreatureWindow();
        getCreaturesBodyData();
    } else {
        document.querySelector('.creatures-window').remove();
    }
}

function renderCreatureWindow() {
    const window = document.querySelector('body').appendChild(document.createElement('div'));
    window.classList.add('creatures-window');
    window.insertAdjacentHTML('beforeend', `
        <div class="creatures-content">
            <div class="creatures-window__header">
                <h2>Creatures</h2>
            </div>
            <div class="creature-window__filters">
                <label>
                    <select id="creature-list-filter" onchange="filterCreaturesList(event.target.value)">
                        <option value="all">All creatures</option>
                        <option value="standard">Standard</option>
                        <option value="custom">Custom</option>
                    </select>
                </label>
                <label>
                    <input placeholder="search" onchange="searchCreaturesList(event.target.value)">
                </label>
                <button class="btn--hover" onclick="toggleNewCreatureForm()">New Creature</button>
            </div>
            <div class="creatures-window__body"></div>
        </div>
    `);
    dragElement(window, 'creatures-window');
}

function filterCreaturesList(value: string) {
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

async function searchCreaturesList(value: string) {
    document.querySelector('.creatures-window__body').innerHTML = '';
    await getCustomCreatures();
    const selectedFilter = (<HTMLInputElement>document.getElementById('creature-list-filter')).value;

    // Filter all standard creatures
    if (selectedFilter === 'all' || selectedFilter === 'standard') {
        creatures.forEach((creature: any) => {
            if (creature.name.toLowerCase().includes(value.toLowerCase())) {
                renderStandardCreatureRow(creature);
            }
        });
    }
    // Filter all custom creatures
    if (selectedFilter === 'all' || selectedFilter === 'custom') {
        customCreatures.forEach((creature: any) => {
            if (creature.name.toLowerCase().includes(value.toLowerCase())) {
                renderCustomCreatureRow(creature);
            }
        });
    }
}

async function getCreaturesBodyData() {
    await getCustomCreatures();
    for (let creature of customCreatures.value) {
        renderCustomCreatureRow(creature);
    }
    for (let creature of creatures.value) {
        renderStandardCreatureRow(creature);
    }
}

async function getStandardCreaturesData() {
    for (let creature of creatures.value) {
        renderStandardCreatureRow(creature);
    }
}

async function getCustomCreaturesData() {
    await getCustomCreatures();
    for (let creature of customCreatures.value) {
        renderCustomCreatureRow(creature);
    }
}

// Displays a standard creature on the creatures list.
function renderStandardCreatureRow(creature: any) {
    // openCreatureStatWindow(creature.index, false);
    document.querySelector('.creatures-window__body').insertAdjacentHTML('beforeend', `
        <div class="creatures-window__standard-creature">
            <div class="creatures-window__item">
                <p>${creature.name}</p>
            </div>
        </div>
    `);
}

// Displays a custom creature on the creatures list.
function renderCustomCreatureRow(creature: any) {
    document.querySelector('.creatures-window__body').insertAdjacentHTML('beforeend', `
        <div class="creatures-window__custom-creature">
            <div class="creatures-window__item">
                <p>${creature.name}</p>
            </div>
            <i class="fa-solid fa-trash-can" onclick="deleteCreature('${creature.index}')"></i>
        </div>
    `);
}

const creatureFormBody: any = `
<div class="creatures-content">
    <button class="btn--window-close" onclick="toggleNewCreatureForm()">X</button>
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
                            <p>Walk</p>
                            <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" onchange="creatureFormWalk = event.target.value">
                        </div>
                        <div class="flex-container">
                            <p>Swim</p>
                            <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" onchange="creatureFormSwim = event.target.value">
                        </div>
                        <div class="flex-container">
                            <p>Burrow</p>
                            <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" onchange="creatureFormBurrow = event.target.value">
                        </div>
                        <div class="flex-container">
                            <p>Fly</p>
                            <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" onchange="creatureFormFly = event.target.value">
                        </div>
                        <div class="flex-container">
                            <p>Climb</p>
                            <input placeholder="30" type="number" class="input--sm creature-inputs__speed-value" onchange="creatureFormClimb = event.target.value">
                        </div>
                    </label>
                </div>
            </div>
        </div>
        <div class="creatures-window-form__body--box">
            <label>Str
                <input class="input--sm" type="number" onchange="creatureFormStr = event.target.value" placeholder="10">
            </label>
            <label>Dex
                <input class="input--sm" type="number" onchange="creatureFormDex = event.target.value" placeholder="10">
            </label>
            <label>Con
                <input class="input--sm" type="number" onchange="creatureFormCon = event.target.value" placeholder="10">
            </label>
            <label>Int
                <input class="input--sm" type="number" onchange="creatureFormInt = event.target.value" placeholder="10">
            </label>
            <label>Wis
                <input class="input--sm" type="number" onchange="creatureFormWis = event.target.value" placeholder="10">
            </label>
            <label>Char
                <input class="input--sm" type="number" onchange="creatureFormChar = event.target.value" placeholder="10">
            </label>
        </div>
        <div class="creatures-window-form__body--box">
            <div>
                <div class="form__input-add form__input-add--proficiency">
                    <label>Proficiencies
                        <div class="flex-container">
                            <input placeholder="Perception" class="input--md creature-inputs__proficiency-name">
                            <input placeholder="6" type="number" class="input--sm creature-inputs__proficiency-value">
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
                            <input placeholder="Darkvision" class="input--md creature-inputs__sense-name">
                            <input placeholder="60" type="number" class="input--sm creature-inputs__sense-value">
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
                        <input placeholder="Ability name" class="input--md creature-inputs__ability-name">
                        <textarea rows="3" cols="40" placeholder="description" class="creature-inputs__ability-desc"></textarea>
                    </label>
                </div>
                <button type="button" onclick="addDescInputs('ability')" class="creature-form__btn--input">Add ability</button>
            </div>
        </div>
        <div class="creatures-window-form__body--box">
            <div>
                <div class="form__input-add form__input-add--action">
                    <label>Actions
                        <input placeholder="Action name" class="input--md creature-inputs__action-name">
                        <textarea rows="3" cols="40" placeholder="description" class="creature-inputs__action-desc"></textarea>
                    </label>
                </div>
                <button type="button" onclick="addDescInputs('action')" class="creature-form__btn--input">Add action</button>
            </div>
        </div>
        <div class="creatures-window-form__body--box">
            <div>
                <div class="form__input-add form__input-add--leg-action">
                    <label>Legendary Actions
                        <input placeholder="Action name" class="input--md creature-inputs__leg-action-name">
                        <textarea rows="3" cols="40" placeholder="description" class="creature-inputs__leg-action-desc"></textarea>
                    </label>
                </div>
                <button type="button" onclick="addDescInputs('leg-action')" class="creature-form__btn--input">Add Legendary action</button>
            </div>
        </div>
        <br/>
        <button type="submit">Add Creature</button>
    </form>
</div>
`;

function toggleNewCreatureForm() {
    creatureFormOpen = !creatureFormOpen;
    if (creatureFormOpen) {
        const window = document.querySelector('body').appendChild(document.createElement('div'));
        window.classList.add('creatures-window-form');
        window.insertAdjacentHTML('beforeend', creatureFormBody);
        
        disableHotkeys();
        dragElement(window, 'creatures-window-form');
    } else {
        document.querySelector('.creatures-window-form').remove();
    }
}

// Adds two inputs when user clicks a button
function addInputs(_name: string) {
    document.querySelector(`.form__input-add--${_name}`).insertAdjacentHTML('beforeend', `
        <div class="flex-container">
            <input placeholder="name" class="input--md creature-inputs__${_name}-name">
            <input placeholder="value" type="number" class="input--sm creature-inputs__${_name}-value">
            <button type="button" onclick="this.parentNode.remove()" class="form__btn--remove">X</button>
        </div>
    `);
}

// Adds an input and textarea when user clicks a button
function addDescInputs(_name: string) {
    document.querySelector(`.form__input-add--${_name}`).insertAdjacentHTML('beforeend', `
        <label>
            <br/>
            <div class="flex-container">
                <input placeholder="Ability name" class="input--md creature-inputs__${_name}-name">
                <button type="button" onclick="this.parentNode.parentNode.remove()" class="form__btn--remove">X</button>
            </div>
            <textarea rows="3" cols="40" placeholder="description" class="creature-inputs__${_name}-desc"></textarea>
        </label>
    `);
}

async function submitCreatureForm(e: Event) {
    e.preventDefault();
    let proficiencies = [];
    let senses = [];
    let abilities = [];
    let actions = [];
    let legActions = [];

    let proficiencyName: any = document.getElementsByClassName('creature-inputs__proficiency-name');
    let proficiencyValue: any = document.getElementsByClassName('creature-inputs__proficiency-value');
    let senseName: any = document.getElementsByClassName('creature-inputs__sense-name');
    let senseValue: any = document.getElementsByClassName('creature-inputs__sense-value');
    let abilityName: any = document.getElementsByClassName('creature-inputs__ability-name');
    let abilityDesc: any = document.getElementsByClassName('creature-inputs__ability-desc');
    let actionName: any = document.getElementsByClassName('creature-inputs__action-name');
    let actionDesc: any = document.getElementsByClassName('creature-inputs__action-desc');
    let legActionName: any = document.getElementsByClassName('creature-inputs__leg-action-name');
    let legActionDesc: any = document.getElementsByClassName('creature-inputs__leg-action-desc');

    for (let i = 0; i < proficiencyName.length; i++) {
        if (proficiencyName[i].value !== '' || proficiencyValue[i].value !== '') {
            proficiencies.push({name: proficiencyName[i].value, value: proficiencyValue[i].value});
        }
    }
    for (let i = 0; i < senseName.length; i++) {
        if (senseName[i].value !== '' || senseValue[i].value !== '') {
            senses.push({name: senseName[i].value, value: senseValue[i].value});
        }
    }
    for (let i = 0; i < abilityName.length; i++) {
        if (abilityName[i].value !== '' || abilityDesc[i].value !== '') {
            abilities.push({name: abilityName[i].value, desc: abilityDesc[i].value});
        }
    }
    for (let i = 0; i < actionName.length; i++) {
        if (actionName[i].value !== '' || actionDesc[i].value !== '') {
            actions.push({name: actionName[i].value, desc: actionDesc[i].value});
        }
    }
    for (let i = 0; i < legActionName.length; i++) {
        if (legActionName[i].value !== '' || legActionDesc[i].value !== '') {
            legActions.push({name: legActionName[i].value, desc: legActionDesc[i].value});
        }
    }

    toggleNewCreatureForm();
    toggleNewCreatureForm();
    if (creaturesOpen) {
        toggleCreaturesWindow();
        setTimeout(function() { toggleCreaturesWindow(); }, 100);
    }

    const newCreature = new CreatureFormData(indexConverter(creatureFormName), 'https://www.dandwiki.com/w/images/3/37/BreadSpawn.jpg', creatureFormName, creatureFormSize, creatureFormType, creatureFormAlignment, creatureFormAc, creatureFormHitPoints, creatureFormHitDice, creatureFormStr, creatureFormDex, creatureFormCon, creatureFormInt, creatureFormWis, creatureFormChar, creatureFormVul, creatureFormRes, creatureFormDmgImmune, creatureFormConImmune, creatureFormLanguages, creatureFormCr, creatureFormXp, creatureFormWalk, creatureFormSwim, creatureFormBurrow, creatureFormFly, creatureFormClimb, proficiencies, senses, abilities, actions, legActions);
    addCreature(newCreature);
}

// Holds creature form data
class CreatureFormData {
    index: string;
    image: string;
    name: string;
    size: string;
    type: string;
    alignment: string;
    ac: number;
    hp: number;
    hitDice: string;
    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    char: number;
    vul: string;
    res: string;
    dmgImmune: string;
    conImmune: string;
    languages: string;
    cr: number;
    xp: number;
    speeds: any;
    proficiencies: any;
    senses: any;
    abilities: any;
    actions: any;
    legActions: any;
    walk: number;
    swim: number;
    burrow: number;
    fly: number;
    climb: number;

    constructor(index: string, image: string, name: string, size: string, type: string, alignment: string, ac: number, hp: number, hitDice: string, str: number, dex: number, con: number, int: number, wis: number, char: number, vul: string, res: string, dmgImmune: string, conImmune: string, languages: string, cr: number, xp: number, walk: number, swim: number, burrow: number, fly: number, climb: number, proficiencies: any, senses: any, abilities: any, actions: any, legActions: any) {
        this.index = index;
        this.image = image;        
        this.name = name;
        this.size = size;
        this.type = type;
        this.alignment = alignment;
        ac || ac === 0 ? this.ac = ac : this.ac = 0;
        hp || hp === 0 ? this.hp = hp : this.hp = 0;
        this.hitDice = hitDice;
        str || str === 0 ? this.str = str : this.str = 10;
        dex || dex === 0 ? this.dex = dex : this.dex = 10;
        con || con === 0 ? this.con = con : this.con = 10;
        int || int === 0 ? this.int = int : this.int = 10;
        wis || wis === 0 ? this.wis = wis : this.wis = 10;
        char || char === 0 ? this.char = char : this.char = 10;
        this.vul = vul;
        this.res = res;
        this.dmgImmune = dmgImmune;
        this.conImmune = conImmune;
        this.languages = languages;
        this.cr = cr;
        this.xp = xp;
        this.walk = walk;
        this.swim = swim;
        this.fly = fly;
        this.burrow = burrow;
        this.climb = climb;
        this.proficiencies = proficiencies;
        this.senses = senses;
        this.abilities = abilities;
        this.actions = actions;
        this.legActions = legActions;
    }
}