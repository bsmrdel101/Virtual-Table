// === GET routes === //

async function getCreatures() {
    try {
        const res = await axios.get('https://www.dnd5eapi.co/api/monsters');
        creatures = res.data.results;
    } catch (err) {
        console.log(err);
    }
}

async function getSpecificCreature(index) {
    try {
        const res = await axios.get(`https://www.dnd5eapi.co/api/monsters/${index}`);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

async function getCustomCreatures() {
    try {
        const res = await axios.get('/api/creatures');
        customCreatures = res.data;
    } catch (err) {
        console.log(err);
    }
}

// === POST routes === //


