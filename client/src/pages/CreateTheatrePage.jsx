import { Box, Button, Container, Paper, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import useHttp from "../customHooks/useHttp";
import { createTheatre } from "../lib/apis";
import { useSnackBarAlert } from "../customHooks/useSnackBarAlert";
import { useNavigate } from "react-router";

const CreateTheatrePage = () => {
    const navigate = useNavigate();
    const{data, error, status, sendRequest}=useHttp(createTheatre, false);
    const{alertUI, showAlert, hideAlert}=useSnackBarAlert();
    const[theatreDetails, setTheatreDetails] = useState({
        name:'',
        address:'',
        contactNo:'',
    });

    const handleChange = (e) => {
        let {name, value} = e.target;
        // console.log("name, value >> ", name, value);
        setTheatreDetails(prevVal=>({...prevVal, [name]:value}));
        // setTheatreDetails({...theatreDetails, [name]:value});
    }

    useEffect(()=>{
        // console.log("Full theatreDetails >> ", theatreDetails);
        if(status==='completed' && data){
            showAlert('Theatre created successfully....', 'success')
            // console.log("Theatre data >> ", data);
            navigate('/theatres');
        }
    }, [status]);



    const submitHandler = (event) => {
        event.preventDefault();
        // console.log("Submit click");
        sendRequest(theatreDetails);
    }

    return <Container maxWidth="sm" sx={{ py: 6 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom align="center">
                Create Theatre
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
                Add a theatre for customers to discover and book shows.
            </Typography>

            <Box component={'form'} onSubmit={submitHandler} noValidate>
                <TextField
                    name="name"
                    label="Theatre name"
                    fullWidth
                    required
                    margin="normal"
                    value={theatreDetails.name}
                    onChange={handleChange}
                />

                <TextField
                    name="address"
                    label="Address"
                    fullWidth
                    margin="normal"
                    multiline
                    minRows={3}
                    value={theatreDetails.address}
                    onChange={handleChange}
                />

                <TextField
                    name="contactNo"
                    label="Contact number"
                    type="tel"
                    fullWidth
                    margin="normal"
                    value={theatreDetails.contactNo}
                    onChange={handleChange}
                />

                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    size="large"
                    disabled={status === 'pending'}
                    sx={{ mt: 3 }}
                >
                    {/* {status === 'pending' ? 'Creating...' : 'Create Theatre'} */}
                    Create Theatre
                </Button>
            </Box>
        </Paper>
        {alertUI}
    </Container>
}

export default CreateTheatrePage;