import axios from "axios";
import { Game } from "../scripts/types";

interface newGame {
    name: string
};

// === GET routes === //

export const getGames = async () => {
    try {
        // const config = {
        //     headers: { "Access-Control-Allow-Credentials": true },
        //     withCredentials: true,
        // };
        const res = await axios.get('/api/dashboard');
        console.log(res.data);
        return res.data;
    } catch (err) {
        console.log(err);
    }
};

export const getPrevGame = async () => {
    try {
        const res = await axios.get('/api/dashboard/prev');
        return res.data[0];
    } catch (err) {
        console.log(err);
    }
};

// === POST routes === //

export const addGame = async (payload: newGame) => {
    try {
        await axios.post('/api/dashboard', payload);
        getGames();
    } catch (err) {
        console.log(err);
    }
};

export const addPrevGame = async (payload: any) => {
    try {
        await axios.delete('/api/dashboard/prev', payload);
        await axios.post('/api/dashboard/prev', payload);
    } catch (err) {
        console.log(err);
    }
};