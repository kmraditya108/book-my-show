import { Box, Button, Container, Grid, Paper, TextField } from "@mui/material"
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import useHttp from "../customHooks/useHttp";
import { createScreening, fecthTheatreById, fetchMoviesByTheatreId } from "../lib/apis";
import TheatreLayout from "../components/TheatreLayout";
import MoviesCardLayout from "../components/MoviesCardLayout";
import Loader from "../components/Loader";


const TheatreDetailsPage = () => {
    const { theatreId } = useParams();
    const { data: theatre, error, status, sendRequest: requestTheatreDetails } = useHttp(fecthTheatreById, false);
    const { data: fetchMoviesByTheatreIdData, error: fetchMoviesByTheatreIdError, status: fetchMoviesByTheatreIdStatus, sendRequest: requestMoviesByTheatreId } = useHttp(fetchMoviesByTheatreId, false);
    const { data: createScreeningData, error: createScreeningError, status: createScreeningStatus, sendRequest: requestCreateScreening } = useHttp(createScreening, false);

    const [screenData, setScreenData] = useState({
        // theatre:'',
        // movie: '',
        // price: '',
        // showTimings: ''
    });

    const [moviesByTheatreId, setMoviesByTheatreId] = useState([]);
    const handleScreening = (e, movieId) => {
        const { name, value } = e.target;
        // console.log("handleScreening --- name, value >> ", name, value);
        setScreenData(prev => ({
            ...prev,
            [movieId]: {
                ...prev[movieId],
                [name]: value
            }
        }))
    }
    const submitScreening = async(movieId) => {
        
        let payload = {
            theatreId: theatreId,
            movieId: movieId,
            price: screenData[movieId].price,
            showTimings: screenData[movieId].showTimings,
        }

        console.log("screenData >>> ", payload);
        await requestCreateScreening(payload);
        await requestMoviesByTheatreId(theatreId);
    }

    useEffect(() => {
        requestTheatreDetails(theatreId);
    }, []);

    useEffect(() => {
        if (status === 'completed' && theatre) {
            // // console.log("status, data >>> ", status, theatre);
            requestMoviesByTheatreId(theatreId);
        }
    }, [status, theatre]);

    useEffect(() => {
        // // console.log("fetchMoviesByTheatreIdStatus, fetchMoviesByTheatreIdData >>> ", fetchMoviesByTheatreIdStatus, fetchMoviesByTheatreIdData);
        if (fetchMoviesByTheatreIdStatus === 'completed' && fetchMoviesByTheatreIdData) {
            setMoviesByTheatreId(fetchMoviesByTheatreIdData)
        }
        
    }, [fetchMoviesByTheatreIdStatus, fetchMoviesByTheatreIdData])

    if (fetchMoviesByTheatreIdStatus !== 'completed' && !fetchMoviesByTheatreIdData) {
        return <Loader message={'Movies details are loading...'} />
    }

    const timeHandler = (e) => {
        console.log("timeHandler >> ", e.target);
    }

    return <Box sx={{ minHeight: '100%' }}>

        {status === 'completed' && theatre && theatre?.payload && <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
            <TheatreLayout theatre={theatre?.payload} />
        </Box>}

        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {fetchMoviesByTheatreIdStatus === 'completed' &&
                    moviesByTheatreId &&
                    moviesByTheatreId.payload &&
                    moviesByTheatreId.payload.map((movie) => <MoviesCardLayout key={movie._id} movie={movie}>
                        {/* createScreening */}
                        <TextField
                            id={`price-${movie._id}`}
                            label="Price"
                            variant="outlined"
                            name='price'
                            value={screenData[movie._id]?.price}
                            onChange={e => handleScreening(e, movie._id)} />
                        <TextField
                            id={`timing-${movie._id}`}
                            label="Show timing"
                            variant="outlined"
                            name='showTimings'
                            value={screenData[movie._id]?.showTimings}
                            onChange={e => handleScreening(e, movie._id)} />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 1.5, py: 0.8, borderRadius: 1, fontWeight: 700 }}
                            onClick={() => submitScreening(movie._id)}
                        >
                            submit
                        </Button>
                    </MoviesCardLayout>)}
            </Grid>
        </Container>
    </Box>
}

export default TheatreDetailsPage;