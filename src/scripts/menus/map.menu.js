let maps = [];
let defaultMaps = [
    {name: 'Default Map', image: 'https://images.squarespace-cdn.com/content/v1/5511fc7ce4b0a3782aa9418b/1429139759127-KFHWAFFFVXJWZNWTITKK/learning-the-grid-method.jpg'},
];
// 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwUhS4RzGYSNBN6rAgSzwcdpzoUkYYIg_Cvg&usqp=CAU'

function addDefaultMaps() {
    for (let map of defaultMaps) {
        addMap(map);
    }
}

function toggleMapMenu(menuName) {
    menuOpen = !menuOpen;
    if (menuOpen) {
        selectedMenu = 'maps';
        // Create menu
        document.querySelector('.game-page-container').insertAdjacentHTML('beforeend', `
            <div class="menu">
                <button class="menu__btn menu__btn--close" onclick="closeMenu()">X</button>
                <div class="menu__body"></div>
            </div>
        `);
        getMapBodyData();
    } else {
        closeMenu(menuName);
    }
}

async function getMapBodyData() {
    await getMaps();
    // Populate menu body
    for (let map of maps) {
        document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
            <div>
                <img src=${map.image} class="menu__item menu__item--map" ondblclick="selectMap(event)" id=${map.id}>
                <p class="menu__item--name">${map.name}</p>
            </div>
        `);
    }

    // Add new map button
    document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
        <div class="menu__item menu__item--map">
            <button class="btn--new-item" onclick="newMap();">New Map</button>
        </div>
    `);
}

function selectMap(e) {
    maps.forEach((map) => {
        if (map.id === parseInt(e.target.getAttribute('id'))) {
            socket.emit('SELECT_MAP', {width: e.target.clientWidth, height: e.target.clientHeight}, map);
        }
    });
}

socket.on('SELECT_MAP', ((e, map) => {
    if (map.name === 'Default Map') {
        // Set image to nothing
        document.querySelector('.grid').style.setProperty('--map-background', `rgb(237 237 237 / 52%)`);
        setupGrid(25, 25);
    } else {
        // Set new map image
        document.querySelector('.grid').style.setProperty('--map-background', `url('${map.image}')`);
        setupGrid(e.width / 2, e.height / 2);
    }
}));

function newMap() {
    document.querySelector('.menu__body').insertAdjacentHTML('beforeend', `
        <form class="form--menu" onsubmit="submitNewMap(event)">
            <input placeholder="name" onchange="mapNameChange(event)" required>
            <input type="file" accept="image/*" onchange="mapImageChange(event)" required>
            <button type="submit">Add Map</button>
        </form>
    `);
    disableHotkeys();
}

// For new map form
let newMapName, newMapImage;
const mapNameChange = (e) => newMapName = e.target.value;
const mapImageChange = (e) => newMapImage = e.target.files[0];

function submitNewMap(e) {
    e.preventDefault();
    addMap({ name: newMapName, image: newMapImage });
}