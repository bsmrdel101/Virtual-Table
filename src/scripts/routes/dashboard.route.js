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

async function getPrevGame() {
    try {
        const res = await axios.get('/api/dashboard/prev');
        return res.data[0];
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

async function addPrevGame(payload) {
    try {
        await axios.delete('/api/dashboard/prev', payload);
        await axios.post('/api/dashboard/prev', payload);
    } catch (err) {
        console.log(err);
    }
}