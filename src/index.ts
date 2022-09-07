import { io, Socket } from "socket.io-client";
import { setupGame } from './scripts/dashboard.js';


const socket: Socket = io();

document.addEventListener('DOMContentLoaded', () => {
    setupGame();
});