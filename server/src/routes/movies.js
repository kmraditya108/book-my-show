import express from 'express';
import {findAll, findOne} from '../controller/movies.js'

const movieRoutes = express.Router();

movieRoutes.get('/', findAll);

movieRoutes.get('/:id', findOne);
// movieRoutes.get('/:id', (req, res)=>{
//     // console.log("movieRoutes findone req >>>> ", req);
    
//     const{id} = req.params;
//     console.log("findOne --- movie id>>>> ", id);
// });



export default movieRoutes;