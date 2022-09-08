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

export async function registerUser(payload: any) {
    try {
        await axios.post('/api/user/register', payload);
        changeRoute('login');
    } catch(err) {
        console.log(err);
    }
}

export async function loginUser(payload: any) {
    try {
        await axios.post('/api/user/login', payload);
        changeRoute('game');
    } catch(err) {
        console.log(err);
    }
}

export async function logout() {
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