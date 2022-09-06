"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import { io, Socket } from "socket.io-client";
const dashboard_1 = require("./scripts/dashboard");
// const socket: Socket = io();
document.addEventListener('DOMContentLoaded', () => {
    (0, dashboard_1.setupGame)();
});
