// import { io, Socket } from "socket.io-client";
import { setupGame } from './scripts/dashboard';



// const socket: Socket = io();

document.addEventListener('DOMContentLoaded', () => {
    setupGame();
});