// === GET routes === //

async function getMaps() {
    try {
        const res = await axios.get('/api/maps');
        maps = res.data;
    } catch (err) {
        console.log(err);
    }
}

// === POST routes === //

async function addMap(payload) {
    try {
        console.log(payload);
        await axios.post('/api/maps', payload);
    } catch (err) {
        console.log(err);
    }
}