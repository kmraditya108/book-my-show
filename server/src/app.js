/**
 * Here we have all Express app related functino
 */

import express from 'express';
import cors from 'cors';

import { ApiResponse } from './core/ApiResponse.js';
import { ApiError} from './core/ApiError.js';
import userRoutes from './routes/users.js';
import movieRoutes from './routes/movies.js'
import expressHealthRoute from './routes/healthCheck.js';

const app = express();
app.use(cors());
app.use(express.json());

/**
 * Introduce routes here: User's, Movie's, healthCheck
 */
app.use("/users", userRoutes);
app.use("/movies", movieRoutes);
app.use(expressHealthRoute);


// Error handler
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        const { status, message = "Something went wrong!" } = err;
        return res.status(status).json(ApiResponse.build(false, message));
    }
    console.log("error >> ", err);
    return res.status(500).json(ApiResponse.build(false, 'Something went wrong!'));
});

export default app;