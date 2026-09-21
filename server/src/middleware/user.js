import jwt from "jsonwebtoken";
import { ApiResponse } from "../core/ApiResponse.js";
import { ForbiddenError, InternalServerError } from "../core/ApiError.js";

const JWT_TOKEN = 'aditya';
export const isLoggedIn = (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '')
        const { userId, role } = jwt.verify(token, JWT_TOKEN);
        req.user = { userId, role };
        return next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(500).json(ApiResponse.build(false, "Please login again to continue!"))
        }
        next(new InternalServerError("Something went wrong while validating the token!"))
    }
}

export const isAdminOrPartner = (req, res, next) => {
    const { userId, role } = req.user;
    if (!(role === "ADMIN" || role === "PARTNER")) {
        return next(new ForbiddenError("You don't have permission to create Theatre"))
    }
    next();
}