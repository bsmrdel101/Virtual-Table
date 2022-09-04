"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTempHealth = exports.setHealth = exports.addCharacter = exports.getCharacter = exports.getCharacters = void 0;
const axios_1 = require("axios");
const character_menu_1 = require("../menus/character.menu");
// === GET routes === //
async function getCharacters() {
    try {
        const res = await axios_1.default.get('/api/characters');
        character_menu_1.characters.value = res.data;
    }
    catch (err) {
        console.log(err);
    }
}
exports.getCharacters = getCharacters;
async function getCharacter(id) {
    try {
        const res = await axios_1.default.get(`/api/characters/${parseInt(id)}`);
        return res.data[0];
    }
    catch (err) {
        console.log(err);
    }
}
exports.getCharacter = getCharacter;
// === POST routes === //
async function addCharacter(payload) {
    try {
        await axios_1.default.post('/api/characters', payload);
    }
    catch (err) {
        console.log(err);
    }
}
exports.addCharacter = addCharacter;
// === PUT routes === //
async function setHealth(payload) {
    try {
        await axios_1.default.put('/api/characters/health', payload);
        character_menu_1.character.value = await getCharacter(payload.id);
    }
    catch (err) {
        console.log(err);
    }
}
exports.setHealth = setHealth;
async function setTempHealth(payload) {
    try {
        await axios_1.default.put('/api/characters/temp', payload);
        character_menu_1.character.value = await getCharacter(payload.id);
    }
    catch (err) {
        console.log(err);
    }
}
exports.setTempHealth = setTempHealth;
