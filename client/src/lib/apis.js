import axios from 'axios';
import { getCookies } from '../utils/cookies';
import { getPath } from './URLS';

const BASE_URL = 'http://localhost:8080';

const httpCallHendler = async (name, method, ...res) => {
    const URL = `${BASE_URL}/${name}`;
    // console.log("httpCallHandler > name, URL, method, ...res >> ", name, URL, method, ...res);

    try {
        let response;
        if (method === 'POST') {
            response = await axios.post(URL, ...res);
        } else {
            response = await axios.get(URL, ...res);
        }
        // console.log("httpCallHandler > response > ", response);
        return response.data;
    } catch (error) {
        // console.log("httpCallHandler > error :: ", error);
    }
}



// Users
export const registerUser = async (newUser) => {
    return httpCallHendler('users/registration', 'POST', newUser);
}

export const loginUser = async (userCreds) => {
    return httpCallHendler('users/login', 'POST', userCreds);
}

export const fetchProfile = async () => {
    const profileRes = httpCallHendler('users/profile', 'get', {
        headers: {
            Authorization: `Bearer ${getCookies('token')}`
        }
    });

    return profileRes;
}

export const getAllUsers = async()=>{
    const configure = {
        headers: {
            Authorization: `Bearer ${getCookies('token')}`
        }
    }
    // console.log("getAllUsers -- configure >>> ", configure);
    const allUsers = await axios.get(`${BASE_URL}/users/all`, configure);
    return allUsers.data;
}

// Movies
export const fetchMovies = async () => {
    const res = await axios.get(`${BASE_URL}/movies`);
    return res.data;
}

export const fetchMovie = async (movieId) => {
    const res = await axios.get(`${BASE_URL}/movies/${movieId}`);
    return res.data;
}

// Theatre
export const createTheatre = async (body) => {

    const configure = {
        headers: {
            Authorization: `Bearer ${getCookies('token')}`
        }
    }

    const res = await axios.post(`${BASE_URL}/theatre/`, body, configure);

    return res.data;
}


export const fetchTheatre = async () => {
    const configure = {
        headers: {
            Authorization: `Bearer ${getCookies('token')}`
        }
    }
    const res = await axios.get(`${BASE_URL}/theatre/`, configure);
    return res.data
}

export const fecthTheatreById = async(theatreId) => {
    const configure = {
        headers: {
            Authorization: `Bearer ${getCookies('token')}`
        }
    }
    const res = await axios.get(`${BASE_URL}/theatre/${theatreId}`, configure);
    return res.data;
}

// Screening --- admin

const config = () => {
    return {
        headers: {
            Authorization: `Bearer ${getCookies('token')}`
        }
    }
}

export const fetchMoviesByTheatreId = async(theatreId) => {
    // console.log("fetchMoviesByTheatreId - config >>> ", config());
    const res = await axios.get(`${BASE_URL}/theatre/${theatreId}/movies`, config());
    console.log("fetchMoviesByTheatreId -- res : ", res);
    return res.data;
}

export const createScreening = async(payload) => {
    const {theatreId,movieId,price,showTimings} = payload;
    console.log("createScreening - payload >> ", payload);
    
    const res = await axios.post(`${BASE_URL}/theatre/${theatreId}/screenings`, payload, config());
    // console.log("fetchMoviesByTheatreId -- res : ", res);
    return res.data;
}
