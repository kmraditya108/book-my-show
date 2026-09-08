import React, { useState } from 'react';
import { Box, Button, Container, FormControl, InputLabel, Link, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useSnackBarAlert } from '../customHooks/useSnackBarAlert';
import { useNavigate, Link as RouterLink } from 'react-router';


const SignUpPage = () => {
    // const [email, setEmail] = useState();
    // const [password, setPassword] = useState();
    const navigate = useNavigate();
    const { alertUI, showAlert, hideAlert } = useSnackBarAlert();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        type: ''
    })
    const handleChange = (e) => {
        console.log("[e.target.name]:e.targte.value >>> ", e.target.name, e.target.value);
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("formData >>> ", formData);
        const { email, password, type: role } = formData;
        console.log("email,password,type >>> ", email, password, role);

        axios.post('http://localhost:8080/registration', {
            email: email,
            password: password,
            role: role
        }).then(res => {
            // console.log("Registartion response : ", res);
            showAlert(res?.data?.message, 'success');
            navigate('/login');
        }).catch(e => {
            console.log('1--Catched errror >> ', e?.response);
            // Fallback to e.message if the server didn't return a custom message
            const errorMessage = e?.response?.data?.message || e?.message || 'An error occurred';

            showAlert(errorMessage, 'error');
        })

    }
    return <Container maxWidth={'md'}>
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Paper>
                <Typography variant='h1' component={'h1'} gutterBottom align='center'>SignUp</Typography>
                <Typography variant='body' color='text.secondary' align='center' sx={{ mb: 3 }}>
                    Create an account to book your favourite movies.
                </Typography>


                <Box component={'form'} onSubmit={handleSubmit} noValidate>
                    <TextField
                        name='email'
                        label='Email'
                        type='email'
                        fullWidth
                        required
                        margin='normal'
                        value={formData.email}
                        onChange={handleChange}
                    // onChange={e => handleChange(e)}
                    />
                    <TextField
                        label='Password'
                        type='password'
                        name='password'
                        fullWidth
                        required
                        margin='normal'
                        value={formData.password}
                        onChange={handleChange}
                    // onChange={e => handleChange(e)}
                    />
                    <FormControl variant="outlined" fullWidth required sx={{mt:2, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-outlined-label">User type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={formData.type}
                            onChange={handleChange}
                            label="Type"
                            name='type'
                            required
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                            <MenuItem value={'USER'}>USER</MenuItem>
                        </Select>
                    </FormControl>

                    <Button type='submit' fullWidth sx={{ mt: 3 }} variant='contained' size='large'>Signup</Button>
                </Box>
                <Typography>Already have an account? <Link to={'/login'} component={RouterLink} variant='contained'>login</Link></Typography>
            </Paper>
        </Box>
        {/* <AlertUI/> */}
        <>{alertUI}</>
    </Container>
}

export default SignUpPage;