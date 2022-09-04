import axios from 'axios';
import { changeRoute } from '../utils';

// === GET routes === //

export async function getUser() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const res = await axios.get('/api/user', config);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

// === POST routes === //

async function registerUser(e: Event, payload: any) {
    e.preventDefault();
    try {
        await axios.post('/api/user/register', payload);
        changeRoute('login');
    } catch(err) {
        console.log(err);
    }
}

async function loginUser(payload: any, e: Event) {
    e.preventDefault();
    try {
        await axios.post('/api/user/login', payload);
        changeRoute('game');
    } catch(err) {
        console.log(err);
    }
}

async function logout() {
    try {
        await axios.post('/api/user/logout');
        changeRoute('login');
    } catch(err) {
        console.log(err);
    }
}

// === PUT routes === //

export async function changeNewUser(payload: any) {
    try {
        await axios.put('/api/user', {newStatus: payload});
    } catch(err) {
        console.log(err);
    }
}