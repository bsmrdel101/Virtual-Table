import { addMap, getMaps } from '../routes/maps.route';
import { selectedMenu, menuOpen, closeMenu, disableHotkeys } from '../utils';
import { root, setupGrid } from '../grid';
import { io, Socket } from "socket.io-client";

const socket: Socket = io();
export let maps = {value: []};
let defaultMaps = [
    {name: 'Default Map', image: 'https://images.squarespace-cdn.com/content/v1/5511fc7ce4b0a3782aa9418b/1429139759127-KFHWAFFFVXJWZNWTITKK/learning-the-grid-method.jpg'},
];

export function addDefaultMaps() {
    for (let map of defaultMaps) {
        addMap(map);
    }
}

export function toggleMapMenu(menuName: string) {
    menuOpen.value = !menuOpen.value;
    if (menuOpen.value) {
        selectedMenu.value = 'maps';
        // Create menu
        document.querySelector('.game-page-container').insertAdjacentHTML('beforeend', `
            <div class="menu">
                <button class="menu__btn menu__btn--close">X</button>
                <div class="menu__body"></div>
            </div>
        `);
        document.querySelector('.menu__btn--close').addEventListener('click', () => closeMenu(menuName));
        getMapBodyData();
    } else {
        closeMenu(menuName);
    }
}

async function getMapBodyData() {
    await getMaps();
    // Populate menu body
    for (let map of maps.value) {
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

function selectMap(e: any) {
    for (let map of maps.value) {
        if (map.id === parseInt(e.target.getAttribute('id'))) {
            socket.emit('SELECT_MAP', {width: e.target.clientWidth, height: e.target.clientHeight}, map);
        }
    }
}

socket.on('SELECT_MAP', ((e, map) => {
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
let newMapName: string, newMapImage: string;
const mapNameChange = (e: any) => newMapName = e.target.value;
const mapImageChange = (e: any) => newMapImage = e.target.files[0];

function submitNewMap(e: any) {
    e.preventDefault();
    addMap({ name: newMapName, image: newMapImage });
}