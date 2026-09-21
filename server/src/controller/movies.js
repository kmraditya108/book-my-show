import mongoose, { Mongoose } from "mongoose";
import { ApiResponse } from "../core/ApiResponse.js";
import Movies from "../models/Movie.js";
import { NotFoundError } from "../core/ApiError.js";
import Screening from "../models/Screenings.js";
import Theatre from "../models/Theatre.js";

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
    
    const screening = await Screening.find({movie:id})
    .populate('theatre', 'name address contactNo')
    .select('theatre showTimings price')
    .sort({createdAt: -1});
    // console.log("screening >>>>> ", screening);
    
    // const screening = await Screening.find({movie:id});
    // console.log("screening >> ", screening);
    // if(!screening) throw new NotFoundError('Theatre not allocated');

    // const theatreIds = screening.map(s=>s.theatre).filter(Boolean) || [];
    // const theatre = await Theatre.find({_id: {$in: theatreIds}});
    // // const theatre = await Theatre.find({_id: screening[0]?.theatre})
    // if(!theatre) throw new NotFoundError('Theatre found error');
    

    res.json(ApiResponse.build('success', 'movie found!', {movie, screening}));
    // res.json(ApiResponse.build('success', 'movie found!', {movie, screening, theatre}));
}

export const findTheatresById = async(req, res) => {
    const{movieId} = req.params;
    const screening = Screening.find({movie:movieId});

    if(!screening) throw new NotFoundError('Theatre not allocated');

    res.json(ApiResponse.build('Success', 'Screening theatre founds for this movie', screening));
}