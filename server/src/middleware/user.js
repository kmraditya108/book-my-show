import jwt from "jsonwebtoken";
import { ApiResponse } from "../core/ApiResponse.js";
import { InternalServerError } from "../core/ApiError.js";

const JWT_TOKEN = 'aditya';
export const isLoggedIn = (req, res, next) => {
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