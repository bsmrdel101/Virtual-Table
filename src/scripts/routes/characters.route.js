// === GET routes === //

async function getCharacters() {
    try {
        const res = await axios.get('/api/characters');
        characters = res.data;
    } catch (err) {
        console.log(err);
    }
}

async function getCharacter(id) {
    try {
        const res = await axios.get(`/api/characters/${parseInt(id)}`);
        return res.data[0];
    } catch (err) {
        console.log(err);
    }
}

// === POST routes === //

async function addCharacter(payload) {
    try {
        await axios.post('/api/characters', payload);
    } catch (err) {
        console.log(err);
    }
}

// === PUT routes === //

async function setHealth(payload) {
    try {
        await axios.put('/api/characters/health', payload);
        character = await getCharacter(payload.id);
    } catch (err) {
        console.log(err);
    }
}

async function setTempHealth(payload) {
    try {
        await axios.put('/api/characters/temp', payload);
        character = await getCharacter(payload.id);
    } catch (err) {
        console.log(err);
    }
}