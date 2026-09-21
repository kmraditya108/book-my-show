import express from 'express';
import {findAll, findOne, findTheatresById} from '../controller/movies.js'

const movieRoutes = express.Router();

movieRoutes.get('/', findAll);

movieRoutes.get('/:id', findOne);
// movieRoutes.get('/:id', (req, res)=>{
//     // console.log("movieRoutes findone req >>>> ", req);
    
//     const{id} = req.params;
//     console.log("findOne --- movie id>>>> ", id);
// });

// movieRoutes.get('/:movieId/screenig', findTheatresById);



export default movieRoutes;