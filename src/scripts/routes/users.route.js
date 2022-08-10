// === GET routes === //

// async function getAllUsers() {
//     try {
//         await axios.get('/api/user')
//         .then((res) => {
//             console.log(res.data);
//         });
//     } catch(err) {
//         console.log(err);
//     }
// }

async function getAllUsers() {
    try {
        const config = {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true,
        };
        await axios.get('/api/user', config)
        .then((res) => {
            console.log(res.data);
        });
    } catch(err) {
        console.log(err);
    }
}

// === POST routes === //

function registerUser(e, payload) {
    e.preventDefault();
    try {
        axios.post('/api/user/register', payload);
        const wl = window.location;
        window.location.replace(`${wl.protocol}//${wl.host}/login`);
    } catch(err) {
        console.log(err);
    }
}

function loginUser(e, payload) {
    e.preventDefault();
    try {
        axios.post('/api/user/login', payload);
        const wl = window.location;
        window.location.replace(`${wl.protocol}//${wl.host}/game`);
    } catch(err) {
        console.log(err);
    }
}