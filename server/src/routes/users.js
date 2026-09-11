import express from 'express';

import { userRegistration, userLogin, findAllUsers, getUserProfile } from '../controller/users.js'
import { isLoggedIn } from '../middleware/user.js';

const routes = express.Router();

routes.post('/registration', userRegistration);

routes.post('/login', userLogin);

routes.get('/all', isLoggedIn, findAllUsers);

routes.get('/profile', isLoggedIn, getUserProfile);

export default routes;