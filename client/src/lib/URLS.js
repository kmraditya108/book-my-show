
const BASE_URL = 'http://localhost:8080';

const URL_PATH = {
    createTheatre: 'theatre/'
}

export const getPath =(path)=> `${BASE_URL}/${URL_PATH[path]}`;