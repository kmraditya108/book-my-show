import { Box, Button, Chip, Container, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { Link as RouterLink } from "react-router";
import { useParams } from "react-router";
import axios from "axios";
import Loader from "../components/Loader.jsx";


const MovieDetailsPage = () => {
    const { movieId } = useParams();

    const [loadedMovie, setLoadedMovie] = useState(null);
    const [isloading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let isActive = true;
        const loadMovie = async () => {
            try {
                setIsLoading(true);
                setError('');
                const response = await axios(`http://localhost:8080/movies/${movieId}`);
                if (isActive) {
                    setLoadedMovie(response.data.payload);
                }
            } catch (error) {
                if (isActive) {
                    setError(error?.response?.data?.message ?? "We could n't load this movie, Please try after sometimes later.");
                }
            } finally {
                if (isActive) {
                    setIsLoading(false);
                }
            }
        }
        loadMovie();

        return () => { isActive = false; }
    }, [movieId]);

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
                <Button component={RouterLink} nativeButton={false} to="/" startIcon={<ArrowBackRoundedIcon />} sx={{ color: 'common.white', mb: { xs: 1.5, md: 1.5 } }}>
                    Back to movies
                </Button>
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
        <Container  maxWidth="lg" sx={{gap:2}}>
                <Stack direction="row" flexWrap="wrap" gap={1} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                            {(loadedMovie.cast ?? []).map((cst) => {
                                return <><Box component="img" src={cst.profilePicture} alt={`${cst.title} poster`} sx={{ mr:5, display: 'flex', flexDirection:'column', width: { xs: 100, sm: 100 }, height: { xs: 100, sm: 100 }, objectFit: 'cover', borderRadius: 50, boxShadow: '0 16px 32px rgba(0,0,0,0.35)' }} />
                                <Typography sx={{ color: 'rgba(111, 111, 111, 0.75)' }}>{cst.name}</Typography>
                                </>})}
                        </Stack>
            </Container>
    </Box>
}

export default MovieDetailsPage;