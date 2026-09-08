import { useContext } from 'react';
import { Link as RouterLink } from 'react-router'
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import UserContext from '../context/user-context';



const Layout = ({ children }) => {
    const{isLoggedIn, email, resetUserContext} = useContext(UserContext)
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBar position='static' elevation={0} sx={{ backgroundColor: '#fff', color: '#1f1f1f', borderBottom: '1px solid #eee' }}>
                <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto' }}>
                    <ConfirmationNumberOutlinedIcon sx={{ color: '#f84464', mr: 1 }} />
                    <Typography variant='h6' component='div' sx={{ flexGrow: 1, color: '#f84464', fontWeight: 800, letterSpacing: -0.3 }}>
                        book<span style={{ color: '#1f1f1f' }}>my</span>show
                    </Typography>

                    {!isLoggedIn && <Button color="inherit" component={RouterLink} to="/login">Login</Button>}
                    {!isLoggedIn && <Button variant="contained" component={RouterLink} to="/signup" sx={{ ml: 1 }}>Sign up</Button>}
                    {isLoggedIn && <Button color="inherit" component={RouterLink} to="/">{email}</Button>}
                    {isLoggedIn && <Button color="inherit" component={RouterLink} to="/" onClick={() => resetUserContext()}>Logout</Button>}
                </Toolbar>
            </AppBar>

            <Box sx={{ flexGrow: 1 }}>
                {children }
            </Box>
        </Box>
    )
}

export default Layout;