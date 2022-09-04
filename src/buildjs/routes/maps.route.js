"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMap = exports.getMaps = void 0;
const axios_1 = require("axios");
const map_menu_1 = require("../menus/map.menu");
// === GET routes === //
async function getMaps() {
    try {
        const res = await axios_1.default.get('/api/maps');
        map_menu_1.maps.value = res.data;
    }
    catch (err) {
        console.log(err);
    }
}
exports.getMaps = getMaps;
// === POST routes === //
async function addMap(payload) {
    try {
        console.log(payload);
        await axios_1.default.post('/api/maps', payload);
    }
    catch (err) {
        console.log(err);
    }
}
exports.addMap = addMap;
