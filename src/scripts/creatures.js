let creatures = [];
let customCreatures = [];
let creaturesOpen = false;

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