"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTokenToMap = exports.addToken = exports.getTokens = void 0;
const axios_1 = require("axios");
const token_menu_1 = require("../menus/token.menu");
// === GET routes === //
async function getTokens() {
    try {
        const res = await axios_1.default.get('/api/tokens');
        token_menu_1.tokens.value = res.data;
    }
    catch (err) {
        console.log(err);
    }
}
exports.getTokens = getTokens;
// === POST routes === //
async function addToken(payload) {
    try {
        await axios_1.default.post('/api/tokens', payload);
    }
    catch (err) {
        console.log(err);
    }
}
exports.addToken = addToken;
async function addTokenToMap(payload) {
    try {
        await axios_1.default.post('/api/tokens/map', payload);
    }
    catch (err) {
        console.log(err);
    }
}
exports.addTokenToMap = addTokenToMap;
