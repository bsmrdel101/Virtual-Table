import axios from 'axios';
import { character, characters } from '../menus/character.menu';

// === GET routes === //

export async function getCharacters() {
    try {
        const res = await axios.get('/api/characters');
        characters.value = res.data;
    } catch (err) {
        console.log(err);
    }
}

export async function getCharacter(id: string) {
    try {
        const res = await axios.get(`/api/characters/${parseInt(id)}`);
        return res.data[0];
    } catch (err) {
        console.log(err);
    }
}

// === POST routes === //

export async function addCharacter(payload: any) {
    try {
        await axios.post('/api/characters', payload);
    } catch (err) {
        console.log(err);
    }
}

// === PUT routes === //

export async function setHealth(payload: any) {
    try {
        await axios.put('/api/characters/health', payload);
        character.value = await getCharacter(payload.id);
    } catch (err) {
        console.log(err);
    }
}

export async function setTempHealth(payload: any) {
    try {
        await axios.put('/api/characters/temp', payload);
        character.value = await getCharacter(payload.id);
    } catch (err) {
        console.log(err);
    }
}