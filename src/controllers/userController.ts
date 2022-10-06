import axios from 'axios';

interface User {
    username: string
    password: string
}

// === GET routes === //

export const getUser = async () => {
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
};

// === POST routes === //

export const registerUser = async (payload: User) => {
    try {
        await axios.post('/api/user/register', payload);
        window.location.pathname = 'login';
    } catch(err) {
        console.log(err);
    }
};

export const loginUser = async (payload: User) => {
    try {
        // const config = {
        //     headers: { "Content-Type": "application/json", "Access-Control-Allow-Credentials": true },
        //     withCredentials: true,
        //     credentials: 'include'
        // };
        await axios.post('/api/user/login', payload);
        window.location.pathname = 'dashboard';
    } catch(err) {
        console.log(err);
    }
};

export const logout = async () => {
    try {
        await axios.post('/api/user/logout');
        window.location.pathname = 'login';
    } catch(err) {
        console.log(err);
    }
};
