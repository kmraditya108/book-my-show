import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router'
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import axios from 'axios';
import MoviesCardLayout from '../components/MoviesCardLayout.jsx'

const HomePage = () => {
    const [movies, setMovies] = useState();

    useEffect(() => {
        (async () => {
            const res = await axios.get('http://localhost:8080/movies');
            setMovies(res?.data?.payload);
        })();
    }, []);

    return <Box sx={{ backgroundColor: 'background.default', minHeight: '100%' }}>
        <Box sx={{ background: 'linear-gradient(110deg, #2b0b13 0%, #6b1d2c 55%, #f84464 150%)', color: '#fff' }}>
            <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 } }}>
                <Typography variant="overline" sx={{ letterSpacing: 2, color: '#ffb6c2', fontWeight: 700 }}>
                    Your movie destination
                </Typography>
                <Typography variant="h2" component="h1" sx={{ mt: 1, maxWidth: 620, fontSize: { xs: '2.25rem', md: '3.75rem' }, fontWeight: 800 }}>
                    Movies that make every night special.
                </Typography>
                <Typography sx={{ mt: 2, maxWidth: 520, color: '#f8dce1' }}>
                    Discover the latest releases, find your favourite stars, and book your next cinema experience.
                </Typography>
                <Stack direction="row" spacing={1.5} sx={{ mt: 3 }}>
                    <Button variant="contained" component={RouterLink} to="/login" sx={{ backgroundColor: '#f84464', '&:hover': { backgroundColor: '#d93655' } }}>
                        Sign in to book
                    </Button>
                    <Button variant="outlined" component={RouterLink} to="/signup" sx={{ color: '#fff', borderColor: '#fff', '&:hover': { borderColor: '#fff', backgroundColor: 'rgba(255,255,255,0.12)' } }}>
                        Create account
                    </Button>
                </Stack>
            </Container>
        </Box>
        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
            <Typography variant="h4" component="h2" fontWeight={800}>Recommended movies</Typography>
            <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>Handpicked for your next big-screen experience</Typography>
            <Grid container spacing={{ xs: 2, md: 3 }}>
                {movies?.map((movie) => (
                    <Grid key={movie._id} size={{ xs: 6, sm: 4, md: 3 }}>
                        <MoviesCardLayout movie={movie} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    </Box>
}

export default HomePage;