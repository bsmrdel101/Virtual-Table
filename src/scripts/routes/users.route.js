// === GET routes === //

async function getUser() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        const res = await axios.get('/api/user', config);
        return res.data;
    } catch(err) {
        console.log(err);
    }
}

// === POST routes === //

async function registerUser(e, payload) {
    e.preventDefault();
    try {
        await axios.post('/api/user/register', payload);
        changeRoute('login');
    } catch(err) {
        console.log(err);
    }
}

async function loginUser(e, payload) {
    e.preventDefault();
    try {
        await axios.post('/api/user/login', payload);
        changeRoute('game');
    } catch(err) {
        console.log(err);
    }
}

// === PUT routes === //

async function changeNewUser(payload) {
    try {
        await axios.put('/api/user', {newStatus: payload});
    } catch(err) {
        console.log(err);
    }
}