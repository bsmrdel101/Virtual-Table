import axios from 'axios';
import { tokens } from '../menus/token.menu';

// === GET routes === //

export async function getTokens() {
    try {
        const res = await axios.get('/api/tokens')
        tokens.value = res.data;
    } catch (err) {
        console.log(err);
    }
}

// === POST routes === //

export async function addToken(payload: any) {
    try {
        await axios.post('/api/tokens', payload);
    } catch (err) {
        console.log(err);
    }
}

export async function addTokenToMap(payload: any) {
    try {
        await axios.post('/api/tokens/map', payload);
    } catch (err) {
        console.log(err);
    }
}