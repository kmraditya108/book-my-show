import express from 'express';
import { isAdminOrPartner, isLoggedIn } from '../middleware/user.js';
import { createScreening, createTheatre, findAllTheatres, findAvailableMovies, findTheatre } from '../controller/theatre.js';

const theatreRoutes = express.Router();

theatreRoutes.get('/', isLoggedIn, isAdminOrPartner, findAllTheatres);
theatreRoutes.post('/', isLoggedIn, isAdminOrPartner, createTheatre);

theatreRoutes.get('/:theatreId', isLoggedIn, isAdminOrPartner, findTheatre);
theatreRoutes.get('/:theatreId/movies', isLoggedIn, isAdminOrPartner, findAvailableMovies);
theatreRoutes.post('/:theatreId/screenings', isLoggedIn, isAdminOrPartner, createScreening);

export default theatreRoutes;