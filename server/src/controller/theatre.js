import Theatre from '../models/Theatre.js';
import { ApiResponse } from '../core/ApiResponse.js';
import { BadRequestError, NotFoundError } from '../core/ApiError.js';
import Logger from '../core/Logger.js';
import mongoose from 'mongoose';
import Screening from '../models/Screenings.js';
import Movies from '../models/Movie.js';


export const findAllTheatres = async (req, res) => {
    const { userId } = req.user;
    const theatres = await Theatre.find({ author: Object(userId) });

    if (!theatres) {
        res.json(ApiResponse.build('Failed', 'Not theatre found', new NotFoundError('No theatre available to this user')))
    }

    res.json(ApiResponse.build('success', 'Theatres found!!', theatres));
}

export const findTheatre = async (req, res) => {
    const {theatreId} = req.params;
    const {userId} = req.user;

    // if(!mongoose.isValidObjectId(theatreId)){
    //     res.json(ApiResponse.build('Failed', 'Theatre not found', new NotFoundError('No theatre available to this id')));
    // }

    const theatre = await Theatre.findOne({ _id: Object(theatreId),  author: userId});
    if (!theatre) {
        res.json(ApiResponse.build('Failed', 'Theatre not found', new NotFoundError('No theatre available to this id')));
    }

    res.json(ApiResponse.build('success', 'Theatre found!!', theatre));
}

export const createTheatre = async (req, res) => {
    try {
        const { userId } = req.user;
        const { name, address, contactNo } = req.body;

        const theatre = await Theatre.create({ name, address, contactNo, author: userId });
        res.status(200).json(ApiResponse.build('success', 'Theatre created successfully', theatre));
    } catch (error) {
        Logger.error("Theatre creation error : ", error)
        res.status(200).json(ApiResponse.build('error', 'Theatre created un-successfully', error));
    }
}

export const findAvailableMovies= async(req, res) => {
    const {theatreId} = req.params;
    const {userId} = req.user;

    const existingScreenings = await Screening.find({theatre: theatreId}).select('movie');
    const screenedMovieIds = existingScreenings.map((screening) => screening?.movie);
    // console.log("existingScreenings >> ", existingScreenings);
    console.log("total screenedMovieIds >> ", screenedMovieIds);
    
    const movies = await Movies.find({_id: {$nin: screenedMovieIds}}).sort({title: 1});
    // console.log("after filter total screenedMovieIds >> ", movies);

    res.json(ApiResponse.build('success', 'Movies available for screening', movies));
}

export const createScreening = async(req, res) => {
    const{theatreId} = req.params;
    const{movieId, showTimings, price} = req.body;
    const{userId} = req.user;
    console.log('createScreening -- req.body >> ', req.body);
    console.log('createScreening --- movieId, showTimings, price >> ', movieId, showTimings, price);
    
    const screening = await Screening.create({
        theatre: theatreId,
        movie: movieId,
        price: price,
        showTimings: showTimings
    });

    // if(!screening) throw new BadRequestError();

    res.json(ApiResponse.build('success', 'Screening created!', screening));
}