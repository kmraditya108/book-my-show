import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { BadRequestError, AuthenticationError } from '../core/ApiError.js';
import { ApiResponse } from '../core/ApiResponse.js';

const JWT_TOKEN = 'aditya';
export const userRegistration = async (req, res) => {
    const { email, password, role } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw new BadRequestError("User already exists with this email");
    }
    const hash = await bcrypt.hash(password, 12);
    const newUser = await User.create({ email, password: hash, role });
    res.json(ApiResponse.build(true, "User created successfully", { email: newUser.email }))
}


export const userLogin = async (req, res) => {
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
}


export const findAllUsers = async (req, res) => {
    const user = await User.find();
    if (!user) {
        throw new BadRequestError("No user found!!!")
    }
    res.json(ApiResponse.build('success', 'All users found!', user));
}

export const getUserProfile = async (req, res) => {
    const { userId } = req;
    const user = await User.findById(userId).select('-password');
    res.json(ApiResponse.build(true, 'user profile', user));
}