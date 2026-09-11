import express from 'express';

const expressHealthRoute = express.Router();

expressHealthRoute.get('/echo', (req, res)=>{
    res.send('Hello Node/Express..');
});

export default expressHealthRoute;