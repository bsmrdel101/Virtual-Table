// === GET routes === //

async function getCharacters() {
    try {
        const res = await axios.get('/api/characters');
        characters = res.data;
    } catch (err) {
        console.log(err);
    }
}

// === POST routes === //

async function addCharacter(payload) {
    try {
        console.log(payload);
        await axios.post('/api/characters', payload);
    } catch (err) {
        console.log(err);
    }
}