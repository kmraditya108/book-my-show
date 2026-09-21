import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Chip, Container, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Link as RouterLink } from "react-router";
import { useParams } from "react-router";
import Loader from "../components/Loader.jsx";
import useHttp from "../customHooks/useHttp.jsx";
import { fetchMovie } from "../lib/apis.js";
import BackButton from "../components/BackButton.jsx";
import TheatreLayout from "../components/TheatreLayout.jsx";
import ErrorScreen from "../components/ErrorScreen.jsx";

const CastCard = ({ image, name, alias }) => {
    return <Card sx={{
        maxWidth: 150,
        mr: 1,
        // display:'flex'
    }}>
        <CardActionArea >
            <CardMedia
                sx={{
                    borderRadius: 100,
                    height: 100,
                    width: 100,
                    justifySelf: 'center',
                    padding: 1
                }}
                component="img"
                // height="180"
                // width="50"
                image={image}
                alt="green iguana"
            />
            <CardContent sx={{ textAlign: 'center', borderTop: 1, borderColor: 'rgba(0, 0, 0, 0.14)' }}>
                <Typography gutterBottom variant="h7" component="div">
                    {name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {alias}
                </Typography>
            </CardContent>
        </CardActionArea>
    </Card>
}

const MovieDetailsPage = () => {
    const { movieId } = useParams();
    const { data: movieData, error: movieError, status: movieStatus, sendRequest: moviesRequestSend } = useHttp(fetchMovie);

    const [loadedMovie, setLoadedMovie] = useState(null);
    const [screeningsDetails, setScreeningsDetails] = useState(null);
    // const [screeningTheatre, setScreeningTheatre] = useState(null);
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        setError('');
        moviesRequestSend(movieId);
    }, [])

    useEffect(() => {
        // console.log("movieStatus >>> ", movieStatus);
        // console.log("1- movieData >>> ", movieData);
        // console.log("2- movieData >>> ", movieData?.payload);
        if (movieStatus === 'completed') {
            if (movieData?.payload?.movie) {
                setLoadedMovie(movieData?.payload?.movie);
            }
            if (movieData?.payload?.screening) {
                setScreeningsDetails(movieData?.payload?.screening)
            }

            if (movieData?.payload?.theatre) {
                console.log("movieData?.payload?.theatre >> ", movieData?.payload?.theatre);

                setScreeningTheatre(movieData?.payload?.theatre)
            }

            setIsLoading(false);
        }

        if (movieStatus === 'completed' && !movieData?.payload?.movie) {
            setError(error?.response?.data?.message ?? "We could n't load this movie, Please try after sometimes later.");
            setIsLoading(false);
        }

    }, [movieData, movieStatus])

    if (isloading) {
        return <Loader message={'Loading movie details...'} />
    }

    if (error) {
        return <ErrorScreen error={error || 'Movie not found'} />
    }

    const rating = loadedMovie.rating.toFixed?.(1) ?? loadedMovie.rating ?? 'N/A';

    return <Box sx={{ bgcolor: '#f5f5f5', minHeight: '100%' }}>
        <Box sx={{ bgcolor: '#1f2533', color: 'common.white', py: { xs: 3, md: 4 } }}>
            <Container maxWidth="lg">
                <BackButton to={'/'} title={'movies'} />
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, md: 4 }} alignItems={{ xs: 'center', sm: 'flex-start' }}>
                    <Box component="img" src={loadedMovie.posterUrl} alt={`${loadedMovie.title} poster`} sx={{ display: 'block', width: { xs: 190, sm: 240 }, height: { xs: 285, sm: 360 }, objectFit: 'cover', borderRadius: 2, boxShadow: '0 16px 32px rgba(0,0,0,0.35)' }} />
                    <Stack spacing={2} sx={{ flexGrow: 1, textAlign: { xs: 'center', sm: 'left' } }}>
                        <Typography component="h1" sx={{ fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 800, lineHeight: 1.12 }}>{loadedMovie.title}</Typography>
                        <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                            <StarRoundedIcon sx={{ color: '#f84464', fontSize: 28 }} />
                            <Typography sx={{ fontWeight: 800, fontSize: '1.2rem' }}>{rating}/10</Typography>
                            {loadedMovie.upvotes ? <Typography sx={{ color: 'rgba(255,255,255,0.75)' }}>({loadedMovie.upvotes.toLocaleString()} votes)</Typography> : null}
                        </Stack>
                        <Stack direction="row" flexWrap="wrap" gap={1} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                            {(loadedMovie.genres ?? []).map((genre) => <Chip key={genre} label={genre} sx={{ bgcolor: 'rgba(255,255,255,0.14)', color: 'common.white', fontWeight: 600 }} />)}
                        </Stack>
                        <Button variant="contained" size="large" sx={{ alignSelf: { xs: 'stretch', sm: 'flex-start' }, bgcolor: '#f84464', px: 4, fontWeight: 700, '&:hover': { bgcolor: '#d93452' } }}>
                            Book tickets
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
        <Container maxWidth="lg" sx={{ gap: 2 }}>
            <Typography component={'h3'} variant="h5" sx={{ pb: 2, fontWeight: 900 }}># About the Movie</Typography>
            {/* <Typography component={'body'}>{loadedMovie?.title} is a {loadedMovie?.genres?.join(', ') || 'feature'} film. Explore the cast and reserve your seats for the big screen.</Typography> */}
            <Typography component={'p'}>{loadedMovie?.title} is a {loadedMovie?.genres?.join(', ') || 'feature'} film. Explore the cast and reserve your seats for the big screen.</Typography>

            <Stack direction="row" flexWrap="wrap" gap={1} justifyContent={{ xs: 'center', sm: 'flex-start' }} sx={{ mt: 5 }}>

                {(loadedMovie.cast ?? []).map((cst) => {
                    return <CastCard key={cst._id} image={cst.profilePicture} name={cst.name} alias={cst.alias} />
                })}
            </Stack>
        </Container>

        {screeningsDetails && <Container sx={{ mt: 5, mb: 10 }}>
            <Typography component={'h3'} variant="h5" sx={{ pb: 2, fontWeight: 900 }}>{'# Screening'} </Typography>
            <Box sx={{ gap: 2, flexDirection: 'row', display: 'flex' }}>{screeningsDetails?.map(screen => screen?.theatre && <TheatreLayout theatre={screen?.theatre}>
                <Box sx={{ pt: 2, borderTop:1, mt:2, px:5 }}>
                    {screen?.showTimings && screen?.showTimings?.map(time => <Button
                        sx={{
                            backgroundColor: 'red',
                            color: 'white',
                            p: 0,
                            borderWidth: 2,
                            borderRadius: 5,
                            borderColor: 'black',

                            position: 'absolute',
                            right: 15,
                            bottom: 10
                        }}>{time}</Button>)}
                    <Typography sx={{
                        position: 'absolute',
                        left: 15,
                        bottom: 10
                    }} component={'p'}>Price: ₹{screen?.price}</Typography>
                </Box>
            </TheatreLayout>)}</Box>
        </Container>}
    </Box>
}

export default MovieDetailsPage;