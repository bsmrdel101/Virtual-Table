let maps = [
    new Map('Default Map', 'https://images.squarespace-cdn.com/content/v1/5511fc7ce4b0a3782aa9418b/1429139759127-KFHWAFFFVXJWZNWTITKK/learning-the-grid-method.jpg'),
    new Map('Test Map', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwUhS4RzGYSNBN6rAgSzwcdpzoUkYYIg_Cvg&usqp=CAU'),
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
                <img src=${map.image} class="menu__item menu__item--map" ondblclick="selectMap()">
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

function selectMap() {

}

function createMap() {

}