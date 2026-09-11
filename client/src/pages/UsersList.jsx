import { useState } from 'react';
import {
  Box,
  Chip,
  Container,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const sampleUsers = [
  {
    _id: '6a9e54de2faa5c8750168ddd',
    email: 'ab@gmail.com',
    password: '$2b$12$VEVEpd4Zo1VRji86XJTmD.M5nMH6crMqe6MhMjB7iRAKA3itY3bU2',
    role: 'USER',
    createdAt: '2026-09-07T06:08:30.113Z',
    updatedAt: '2026-09-07T06:08:30.113Z',
  },
  {
    _id: '6a9e54de2faa5c8750168dde',
    email: 'admin@gmail.com',
    password: '$2b$12$3GQ8vffkiw2M2mC0aPz8bO8m9lEJtcmj9f8lKzQJ7fZfA5Vv2rHfS',
    role: 'ADMIN',
    createdAt: '2026-09-08T10:20:00.000Z',
    updatedAt: '2026-09-09T12:45:00.000Z',
  },
];

const formatDate = (value) => {
  if (!value) return 'N/A';

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
};

const UsersList = ({ users = sampleUsers }) => {
  const [showPasswordMap, setShowPasswordMap] = useState({});

  const togglePasswordVisibility = (userId) => {
    setShowPasswordMap((prev) => ({
      ...prev,
      [userId]: !prev[userId],
    }));
  };

  return (
    <Container maxWidth="xl" sx={{ py: 5 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight={700}>
          Users List
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          Manage users and their account details.
        </Typography>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell sx={{ fontWeight: 700 }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Password</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Created At</TableCell>
              <TableCell sx={{ fontWeight: 700 }}>Updated At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              const isPasswordVisible = !!showPasswordMap[user._id];

              return (
                <TableRow key={user._id || user.email} hover>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="body2" sx={{ minWidth: 120 }}>
                        {isPasswordVisible ? user.password : '****'}
                      </Typography>
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => togglePasswordVisibility(user._id)}
                        aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                      >
                        {isPasswordVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={user.role}
                      color={user.role === 'ADMIN' ? 'secondary' : 'primary'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>{formatDate(user.updatedAt)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default UsersList;