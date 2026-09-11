import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarIcon from '@mui/icons-material/Star';
import { Box, Button, Card, CardContent, CardMedia, IconButton, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router';

export default function MoviesCardLayout({ movie }) {

    return (
        <Card component={RouterLink} to={`/movie/${movie._id}`} sx={{
            overflow: 'hidden',
            borderRadius: 2,
            backgroundColor: 'background.paper',
            boxShadow: '0 4px 14px rgba(31, 31, 31, 0.08)',
            transition: 'transform 180ms ease, box-shadow 180ms ease',
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 24px rgba(31, 31, 31, 0.16)'
            }
        }}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    image={movie?.posterUrl}
                    alt={`${movie?.title} poster`}
                    sx={{ aspectRatio: '2 / 3', objectFit: 'cover' }}
                />
                <IconButton
                    aria-label={`Add ${movie?.title} to favourites`}
                    sx={{
                        position: 'absolute',
                        top: 10,
                        right: 10,
                        color: '#fff',
                        backgroundColor: 'rgba(0, 0, 0, 0.48)',
                        '&:hover': { backgroundColor: 'rgba(248, 68, 100, 0.9)' }
                    }}
                >
                    <FavoriteBorderIcon fontSize="small" />
                </IconButton>
            </Box>

            <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
                <Typography variant="subtitle1" fontWeight={700} noWrap title={movie?.title}>
                    {movie?.title}
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mt: 0.5 }}>
                    <StarIcon sx={{ fontSize: 16, color: '#f5a623' }} />
                    <Typography variant="body2" fontWeight={700}>{movie?.rating}</Typography>
                    <Typography variant="body2" color="text.secondary">/ 10</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" noWrap sx={{ mt: 0.75 }}>
                    {movie?.genres?.join(' · ')}
                </Typography>
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 1.5, py: 0.8, borderRadius: 1, fontWeight: 700 }}
                    component={RouterLink}
                    to={`/movies/${movie._id}`}
                >
                    Book tickets: {movie._id}
                </Button>
            </CardContent>
        </Card>
    );
}
