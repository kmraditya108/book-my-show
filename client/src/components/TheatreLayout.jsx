import {Link as RouterLink} from 'react-router';
import { Button, Card, CardContent, Stack, Typography } from "@mui/material";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
// import { Children } from 'react';

const TheatreLayout = ({theatre, children=null}) => {
    console.log("theatre >> ", theatre);
    

    return <>
        <Card key={theatre._id} elevation={2} sx={{position:'relative'}}>
            <CardContent>
                <Typography component="h2" variant="h6" sx={{ fontWeight: 700 }}>
                    {theatre.name}
                </Typography>
                <Stack spacing={1} sx={{ mt: 2 }}>
                    {theatre.address && (
                        <Stack direction="row" spacing={1} alignItems="flex-start">
                            <LocationOnOutlinedIcon color="action" fontSize="small" />
                            <Typography variant="body2">{theatre.address}</Typography>
                        </Stack>
                    )}
                    {theatre.contactNo && (
                        <Stack direction="row" spacing={1} alignItems="center">
                            <PhoneOutlinedIcon color="action" fontSize="small" />
                            <Typography variant="body2">{theatre.contactNo}</Typography>
                        </Stack>
                    )}
                </Stack>
                {children}
            </CardContent>
        </Card>
    </>
}

export default TheatreLayout;