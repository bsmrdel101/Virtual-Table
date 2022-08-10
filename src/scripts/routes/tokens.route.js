// === GET routes === //

async function getTokens() {
    try {
        await axios.get('/api/tokens')
        .then((res) => {
            console.log(res.data);
            tokens = [...tokens, res.data];
        });
    } catch(err) {
        console.log(err);
    }
}

// === POST routes === //

function addToken(e, payload) {
    e.preventDefault();
    try {
        axios.post('/api/tokens', payload);
    } catch(err) {
        console.log(err);
    }
}