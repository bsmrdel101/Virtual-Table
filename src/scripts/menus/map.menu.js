let maps = [
    new Map(1, 'Default Map', 'https://images.squarespace-cdn.com/content/v1/5511fc7ce4b0a3782aa9418b/1429139759127-KFHWAFFFVXJWZNWTITKK/learning-the-grid-method.jpg'),
    new Map(2, 'Test Map', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwUhS4RzGYSNBN6rAgSzwcdpzoUkYYIg_Cvg&usqp=CAU'),
];


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

        setTimeout(getMapBodyData(), 1000);
    } else {
        closeMenu(menuName);
    }
}

function getMapBodyData() {
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
            <button class="new-map-btn">New Map</button>
        </div>
    `);
}

function selectMap(e) {
    for (let map of maps) {
        if (map.id === parseInt(e.target.getAttribute('id'))) {
            socket.emit('selectMap', {width: e.target.clientWidth, height: e.target.clientHeight}, map);
        }
    }
}

socket.on('selectMap', ((e, map) => {
    if (map.name === 'Default Map') {
        // Set image to nothing
        root.style.setProperty('--background-image', `url('')`);
        setupGrid(25, 25, true);
    } else {
        // Set new map image
        root.style.setProperty('--background-image', `url(${map.image})`);
        setupGrid(e.width / 2, e.height / 2, true);
    }
}));

function addMap(e) {

}