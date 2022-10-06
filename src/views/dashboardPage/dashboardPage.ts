import '../../../build/views/dashboardPage/dashboardPage.css';
import gamesList from '../../components/gamesList/gamesList';
import { logout } from '../../controllers/userController';
import { Client } from '../../scripts/types';
import { ready } from '../../scripts/utils';
import { io,  } from "socket.io-client";

const socket: any = io();

export let room: string;
export let client: Client;

export const joinPlayer = (roomCode: string) => {
    room = roomCode;
    socket.emit('TEST', 'hello world', () => {
        console.log('hello');
    });
    // socket.emit('JOIN_ROOM', 'player', room, (roomExists, newClient) => {
    //     if (roomExists) {
    //         client = newClient;
    //         gameScreen();
    //         addPrevGame({game: roomCode});
    //         socket.emit('FETCH_BOARD');
    //     } else {
    //         console.log('room doesn\'t exist');
    //     }
    // });
};

export const joinDM = (roomCode: string) => {
    room = roomCode;
    // socket.emit('JOIN_ROOM', 'dm', room, (roomExists, newClient) => {
    //     if (roomExists) {
    //         client = newClient;
    //         gameScreen();
    //     } else {
    //         console.log('game already started');
    //     }
    // });
};

export default function dashboardPage() {
    let roomCode: string;

    ready(() => {
        bindEventsToForm();
    });

    const bindEventsToForm = () => {
        document.getElementById('join-room-form')?.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            joinPlayer(roomCode);
        });
        document.getElementById('room-code-input')?.addEventListener('change', (e: any) => {
            roomCode = e.target.value;
        });
        document.getElementById('dashboard-logout-btn')?.addEventListener('click', () => {
            logout();
        });
    };

    return (`
        <div class="dashboard-page">
            <h1 class="page-title">Dashboard</h1>
            <div class="dashboard-container">
                <form id="join-room-form" class="form--join-room">
                    <input id="room-code-input" placeholder="room code" value="" required>
                    <button type="submit">Join Room</button>
                </form>
                ${gamesList()}
                <button id="dashboard-logout-btn" class="button btn--hover btn--logout">Log out</button>
            </div>
        </div>
    `);
}
