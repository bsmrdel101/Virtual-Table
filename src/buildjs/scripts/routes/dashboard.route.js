"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPrevGame = exports.addGame = exports.getPrevGame = exports.getGames = void 0;
const axios_1 = require("axios");
const dashboard_1 = require("../dashboard");
// === GET routes === //
async function getGames() {
    try {
        const res = await axios_1.default.get('/api/dashboard');
        dashboard_1.gamesList.value = res.data;
        (0, dashboard_1.setGamesList)();
    }
    catch (err) {
        console.log(err);
    }
}
exports.getGames = getGames;
async function getPrevGame() {
    try {
        const res = await axios_1.default.get('/api/dashboard/prev');
        return res.data[0];
    }
    catch (err) {
        console.log(err);
    }
}
exports.getPrevGame = getPrevGame;
// === POST routes === //
async function addGame(payload, e) {
    e.preventDefault();
    try {
        await axios_1.default.post('/api/dashboard', payload);
        getGames();
    }
    catch (err) {
        console.log(err);
    }
}
exports.addGame = addGame;
async function addPrevGame(payload) {
    try {
        await axios_1.default.delete('/api/dashboard/prev', payload);
        await axios_1.default.post('/api/dashboard/prev', payload);
    }
    catch (err) {
        console.log(err);
    }
}
exports.addPrevGame = addPrevGame;
