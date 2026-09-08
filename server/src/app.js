/**
 * Here we have all Express app related functino
 */

import express from 'express';
import User from './models/User.js';
import bcrypt from 'bcrypt';
import { ApiResponse } from './core/ApiResponse.js';
import { ApiError, AuthenticationError, BadRequestError, InternalServerError } from './core/ApiError.js';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import Movies from './models/Movie.js';

const app = express();
app.use(cors());

const JWT_TOKEN = 'aditya';
const isLoggedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')
        const { userId } = jwt.verify(token, JWT_TOKEN);
        req.userId = userId;
        return next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(500).json(ApiResponse.build(false, "Please login again to continue!"))
        }
        next(new InternalServerError("Something went wrong while validating the token!"))
    }
}

app.use(express.json());

app.get('/echo', (req, res) => {
    res.send('Echo received!!!');
});

app.post('/registration', async (req, res) => {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new BadRequestError("User already exists with this email");
    }
    const hash = await bcrypt.hash(password, 12);
    const newUser = await User.create({ email, password: hash, role });
    res.json(ApiResponse.build(true, "User created successfully", { email: newUser.email }))
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Verify the incoming email
    const user = await User.findOne({ email });
    if (!user) {
        throw new AuthenticationError("Invalid credentials");
    }

    // Verify the incoming password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new AuthenticationError("Invalid credentials");
    }

    // generate JWT token
    const token = jwt.sign({ userId: user._id }, JWT_TOKEN, { expiresIn: '2d' });

    const userObj = user.toObject();
    delete userObj.password;

    res.json(ApiResponse.build(true, `Logged in sucessfully.Hello ${email}!! How are you?`, { ...userObj, token: token }));
});

app.get('/users', isLoggedIn, async (req, res) => {
    const user = await User.find();
    if (!user) {
        throw new BadRequestError("No user found!!!")
    }
    res.json(user);
})

app.get('/profile', isLoggedIn, async (req, res) => {
    const { userId } = req;
    const user = await User.findById(userId).select('-password');
    res.json(ApiResponse.build(true, 'user profile', user));
});

// Movies api
app.get('/movies', async(req, res)=>{
    const movies = await Movies.find();
    res.json(ApiResponse.build('success', 'All Movies', movies));
})



// Error handler
app.use((err, req, res, next) => {
    if (err instanceof ApiError) {
        const { status, message = "Something went wrong!" } = err;
        return res.status(status).json(ApiResponse.build(false, message));
    }
    return res.status(500).json(ApiResponse.build(false, 'Something went wrong!'));
});




export default app;