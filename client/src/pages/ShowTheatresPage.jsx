import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router";
import { Alert, Box, Button, Container, Typography } from "@mui/material";
import useHttp from "../customHooks/useHttp"
import { fetchTheatre } from "../lib/apis";
import { useSnackBarAlert } from "../customHooks/useSnackBarAlert";
import TheatreLayout from "../components/TheatreLayout";
import BackButton from "../components/BackButton";


const ShowTheatresPage = () => {
    const { status, error, data: theatres, sendRequest } = useHttp(fetchTheatre, false);
    const{alertUI, showAlert} = useSnackBarAlert();
    const [theatreLists, setTheatreLists] = useState([]);

    useEffect(() => {
        sendRequest();
    }, []);

    useEffect(() => {
        if (status === "completed" && theatres) {
            showAlert(theatres?.message, 'success');
            setTheatreLists(theatres?.payload);
        }
    }, [status, theatres]);

    if (status === 'pending') {
        return (
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Typography color="text.secondary">Loading theatres...</Typography>
            </Container>
        )
    }

    if (error) {
        // showAlert(theatres?.message, 'error');
        return (
            <Container maxWidth="lg" sx={{ py: 6 }}>
                <Alert severity="error">{error || 'Unable to load theatres.'}</Alert>
            </Container>
        )
    }


    return <Container maxWidth="lg" sx={{ py: 6 }}>
        <BackButton to={'/'} title={'home'} />
        <Typography component="h1" variant="h4" sx={{ fontWeight: 700 }}>
            Theatres
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 0.5, mb: 3 }}>
            Browse theatres available for your next movie experience.
        </Typography>


        {theatreLists?.length ? (
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 2 }}>
                {theatreLists.map((theatre) => (
                    <TheatreLayout key={theatre._id} theatre = {theatre}>
                        <Button component={RouterLink} nativeButton={false} to={`/theatres/${theatre._id}`} size="small" sx={{ mt: 2, px: 0 }}>
                            View details
                        </Button>
                    </TheatreLayout>
                ))}
            </Box>
        ) : (
            <Typography color="text.secondary">No theatres are available yet.</Typography>
        )}
        {alertUI}
    </Container>
}

export default ShowTheatresPage;