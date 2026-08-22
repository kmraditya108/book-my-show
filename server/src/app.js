/**
 * Here we have all Express app related functino
 */

import express from 'express';
import User from './models/User.js';
import bcrypt from 'bcrypt';
import { ApiResponse } from './core/ApiResponse.js';
import { ApiError, AuthenticationError, BadRequestError, InternalServerError } from './core/ApiError.js';
import jwt from 'jsonwebtoken';


const app = express();
const JWT_TOKEN = 'aditya';
const isLoggedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')
        const {userId} = jwt.verify(token, JWT_TOKEN);
        // console.log(req.headers);
        // console.log("decodedData >>>>>> ", decodedData);
        req.userId = userId;
        return next();
    } catch (error) {
        // console.log("error :: ", error);
        
        if(error.name === "JsonWebTokenError"){
            return res.status(500).json(ApiResponse.build(false, "Please login again to continue!"))
        }
        next(new InternalServerError("Something went wrong while validating the token!"))
    }
    
}

app.use(express.json());

app.get('/echo', (req, res)=>{
    res.send('Echo received!!!');
});

// Sign up route
// app.get('/fakeuser', async(req, res)=>{
//     const passHash = await bcrypt.hash('1234', 12);
//     const user = await User.create({email: 'abc@gmail.com', passowrdHash: passHash})
//     res.json(user);
// })

app.post('/registration', async(req, res)=>{
    const{email, password, role} = req.body;
    const user = await User.findOne({ email });
    if(user){
        throw new BadRequestError("User already exists with this email");
    }
    const hash = await bcrypt.hash(password, 12);
    const newUser = await User.create({ email, password: hash, role });
    res.json(ApiResponse.build(true, "User created successfully", {email:newUser.email}))
    // res.json(newUser);
});

app.post('/login', async (req, res)=>{
    const{email, password} = req.body;

    // Verify the incoming email
    const user = await User.findOne({email});
    if(!user){
        throw new AuthenticationError("Invalid email or password");
    }
    console.log("login user: :: ", user);
    
    // Verify the incoming password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if(!isPasswordCorrect){
        throw new AuthenticationError("Invalid email or password");
    }

    // generate JWT token
    const token = jwt.sign({userId: user._id}, JWT_TOKEN, {expiresIn:'2d'});


    res.json(ApiResponse.build(true, `Logged in sucessfully.Hello ${email}!! How are you?`, {token: token}));
});

app.get('/users', isLoggedIn, async(req, res)=>{
    const user = await User.find();
    if(!user){
        throw new BadRequestError("No user found!!!")
    }
    res.json(user);
})

app.get('/profile', isLoggedIn, async (req, res)=>{
    const{userId} = req;
    const user = await User.findById(userId).select('-password');
    console.log("Profile user : ", user);
    
    // res.send('Sending you the profile!!');
    res.json(ApiResponse.build(true, 'user profile', user));
})


// Error handler
app.use((err, req, res, next)=>{
    if(err instanceof ApiError){
        const{status, message="Something went wrong!"}=err;
        return res.status(status).json(ApiResponse.build(false, message));
    }
    return res.status(500).json(ApiResponse.build(false, 'Something went wrong!'));
    // res.status(500).json({status:false, message:message});
})

export default app;