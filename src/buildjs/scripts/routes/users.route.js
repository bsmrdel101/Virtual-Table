"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeNewUser = exports.getUser = void 0;
const axios_1 = require("axios");
const utils_1 = require("../utils");
// === GET routes === //
async function getUser() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const res = await axios_1.default.get('/api/user', config);
        return res.data;
    }
    catch (err) {
        console.log(err);
    }
}
exports.getUser = getUser;
// === POST routes === //
async function registerUser(e, payload) {
    e.preventDefault();
    try {
        await axios_1.default.post('/api/user/register', payload);
        (0, utils_1.changeRoute)('login');
    }
    catch (err) {
        console.log(err);
    }
}
async function loginUser(payload, e) {
    e.preventDefault();
    try {
        await axios_1.default.post('/api/user/login', payload);
        (0, utils_1.changeRoute)('game');
    }
    catch (err) {
        console.log(err);
    }
}
async function logout() {
    try {
        await axios_1.default.post('/api/user/logout');
        (0, utils_1.changeRoute)('login');
    }
    catch (err) {
        console.log(err);
    }
}
// === PUT routes === //
async function changeNewUser(payload) {
    try {
        await axios_1.default.put('/api/user', { newStatus: payload });
    }
    catch (err) {
        console.log(err);
    }
}
exports.changeNewUser = changeNewUser;
