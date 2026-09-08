import React, { useCallback, useMemo, useState, useContext } from 'react';
import { Box, Button, Container, FormControl, InputLabel, Link, MenuItem, Paper, Select, TextField, Typography } from '@mui/material';
import { debounce } from '../utils/debounce';
import axios from 'axios';
import { useSnackBarAlert } from '../customHooks/useSnackBarAlert';
import UserContext from '../context/user-context';

const LoginPage = () => {
    const userContext = useContext(UserContext);
    const{isLoggedIn, role, email, token, loginUser}=userContext;
    const{showAlert, hideAlert, alertUI}=useSnackBarAlert();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        // role: ''
    });

    const handleFormSubmit = async e => {
        e.preventDefault();
        console.log("formData >> ", formData);
        const loginRes = await loginUser({...formData});
        // const res = loginRes.json();
        console.log("loginRes >> ", isLoggedIn, role, email, token, loginRes);
        
        
        // axios.post('http://localhost:8080/login', {...formData})
        // .then(res=>{
        //     console.log('login Success res > ', res);
        //     showAlert(res?.data?.message, 'success')
        // }).catch(e=>{
        //     showAlert(e?.response?.data?.message, 'error')
        // });
    }

    // Pass a function () => debounce(...) inside useMemo so it only creates ONE instance
    const debouncedSetFormData = useMemo(
        () => debounce((name, value) => {
            setFormData(prev => ({ ...prev, [name]: value }));
        }, 500),
        [] // Empty dependency array keeps the exact same debounced instance forever
    );

    const handleFormEvent = e => {
        const { name, value } = e.target;
        // debouncedSetFormData(name, value);
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return <Container maxWidth={'md'}>
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <Paper>
                <Typography variant='h1' component={'h1'} gutterBottom align='center'>Login</Typography>
                <Typography variant='body' color='text.secondary' align='center' sx={{ mb: 3 }}>Kindly login to continue</Typography>

                <Box component={'form'} onSubmit={handleFormSubmit} noValidate>
                    <TextField
                        name='email'
                        label='Email'
                        type='email'
                        fullWidth
                        required
                        margin='normal'
                        value={formData.email}
                        onChange={handleFormEvent}
                    />
                    <TextField
                        name='password'
                        label='Password'
                        type='password'
                        fullWidth
                        required
                        margin='normal'
                        value={formData.password}
                        onChange={handleFormEvent}
                    />
                    {/* <FormControl variant="outlined" fullWidth required sx={{ mt: 2, minWidth: 120 }}>
                        <InputLabel id="demo-simple-select-outlined-label">User type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={formData.role}
                            onChange={handleFormEvent}
                            label="Role"
                            name='role'
                            required
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'ADMIN'}>ADMIN</MenuItem>
                            <MenuItem value={'USER'}>USER</MenuItem>
                        </Select>
                    </FormControl> */}
                    <Button type='submit' fullWidth sx={{ mt: 3 }} variant='contained' size='large'>Get Started</Button>
                </Box>
            </Paper>
        </Box>
        {alertUI}
    </Container>
}

export default LoginPage;