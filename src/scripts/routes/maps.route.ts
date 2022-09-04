import axios from 'axios';
import { maps } from '../menus/map.menu';

// === GET routes === //

export async function getMaps() {
    try {
        const res = await axios.get('/api/maps');
        maps.value = res.data;
    } catch (err) {
        console.log(err);
    }
}

// === POST routes === //

export async function addMap(payload: any) {
    try {
        console.log(payload);
        await axios.post('/api/maps', payload);
    } catch (err) {
        console.log(err);
    }
}