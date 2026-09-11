import { Container, Typography } from "@mui/material"

const Loader = ({message}) => {
    return <Container maxWidth='lg' sx={{py:8}}>
        <Typography color="text.secondary">
        {message}
        </Typography>
    </Container>
}

export default Loader;