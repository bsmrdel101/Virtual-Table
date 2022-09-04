"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleMapMenu = exports.addDefaultMaps = exports.maps = void 0;
const maps_route_1 = require("../routes/maps.route");
const utils_1 = require("../utils");
const grid_1 = require("../grid");
const socket_io_client_1 = require("socket.io-client");
const socket = (0, socket_io_client_1.io)();
exports.maps = { value: [] };
let defaultMaps = [
    { name: 'Default Map', image: 'https://images.squarespace-cdn.com/content/v1/5511fc7ce4b0a3782aa9418b/1429139759127-KFHWAFFFVXJWZNWTITKK/learning-the-grid-method.jpg' },
];
function addDefaultMaps() {
    for (let map of defaultMaps) {
        (0, maps_route_1.addMap)(map);
    }
}
exports.addDefaultMaps = addDefaultMaps;
function toggleMapMenu(menuName) {
    utils_1.menuOpen.value = !utils_1.menuOpen.value;
    if (utils_1.menuOpen.value) {
        utils_1.selectedMenu.value = 'maps';
        // Create menu
        document.querySelector('.game-page-container').insertAdjacentHTML('beforeend', `
            <div class="menu">
                <button class="menu__btn menu__btn--close" onclick="closeMenu()">X</button>
                <div class="menu__body"></div>
            </div>
        `);
        getMapBodyData();
    }
    else {
        (0, utils_1.closeMenu)(menuName);
    }
}
exports.toggleMapMenu = toggleMapMenu;
async function getMapBodyData() {
    await (0, maps_route_1.getMaps)();
    // Populate menu body
    for (let map of exports.maps.value) {
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
    for (let map of exports.maps.value) {
        if (map.id === parseInt(e.target.getAttribute('id'))) {
            socket.emit('SELECT_MAP', { width: e.target.clientWidth, height: e.target.clientHeight }, map);
        }
    }
}
socket.on('SELECT_MAP', ((e, map) => {
    if (map.name === 'Default Map') {
        // Set image to nothing
        grid_1.root.style.setProperty('--background-image', `url('')`);
        (0, grid_1.setupGrid)(25, 25, true);
    }
    else {
        // Set new map image
        grid_1.root.style.setProperty('--background-image', `url(${map.image})`);
        (0, grid_1.setupGrid)(e.width / 2, e.height / 2, true);
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
    (0, utils_1.disableHotkeys)();
}
// For new map form
let newMapName, newMapImage;
const mapNameChange = (e) => newMapName = e.target.value;
const mapImageChange = (e) => newMapImage = e.target.files[0];
function submitNewMap(e) {
    e.preventDefault();
    (0, maps_route_1.addMap)({ name: newMapName, image: newMapImage });
}
