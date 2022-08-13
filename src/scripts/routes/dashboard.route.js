// === GET routes === //

async function getGames() {
    try {
        const res = await axios.get('/api/dashboard');
        gamesList = res.data;
        setGamesList();
    } catch (err) {
        console.log(err);
    }
}

// === POST routes === //

async function addGame(payload, e) {
    e.preventDefault();
    try {
        await axios.post('/api/dashboard', payload);
        getGames();
    } catch (err) {
        console.log(err);
    }
}