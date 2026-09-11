import { Alert, Button, Container } from "@mui/material";
import {Link as RouterLink} from 'react-router'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'


const ErrorScreen = ({error, btnText}) => {
    return <Container maxWidth='lg' sx={{py:6}}>
        <Alert severity="error" sx={{mb:2}}>{error}</Alert>
        <Button component={RouterLink} to={'/'} startIcon={<ArrowBackRoundedIcon/>}>{btnText ? btnText : 'Back to Home Page'}</Button>
    </Container>
}

export default ErrorScreen;