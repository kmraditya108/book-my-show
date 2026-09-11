import mongoose, { Mongoose } from "mongoose";
import { ApiResponse } from "../core/ApiResponse.js";
import Movies from "../models/Movie.js";
import { NotFoundError } from "../core/ApiError.js";

/**
 * Controller: 
 * 1. It itercepts request
 * 2. Executes the business logic based on MVC architecture, can interact with modal layer if needed.
 * 3. send back the http response
 */
export const findAll = async(req, res)=>{
    const movies = await Movies.find();
    res.json(ApiResponse.build('success', 'All Movies', movies));
}

export const findOne = async(req, res) => {
    const{id} = req.params;
    console.log("findOne --- movie id>>>> ", id);
    const movie = await Movies.findById(id);
    
    if(!movie) throw new NotFoundError('No movie found')
    res.json(ApiResponse.build('success', 'movie found!', movie));
}