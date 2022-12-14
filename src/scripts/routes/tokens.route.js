// === GET routes === //

async function getTokens() {
    try {
        const res = await axios.get('/api/tokens')
        tokens = res.data;
    } catch (err) {
        console.log(err);
    }
}

// === POST routes === //

async function addToken(payload) {
    try {
        await axios.post('/api/tokens', payload);
    } catch (err) {
        console.log(err);
    }
}

async function addTokenToMap(payload) {
    try {
        await axios.post('/api/tokens/map', payload);
    } catch (err) {
        console.log(err);
    }
}