// client/src/components/Login.tsx
import React, { useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  FormControl,
} from '@mui/material';
import api from '../api';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      setMessage('Login successful!');
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #fce4ec, #f8bbd0)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={6} sx={{ borderRadius: 2, overflow: 'hidden' }}>
          <Box
            sx={{
              backgroundColor: 'secondary.main',
              color: 'white',
              py: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4">Welcome Back</Typography>
          </Box>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <form onSubmit={handleLogin}>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </FormControl>
                <FormControl fullWidth margin="normal">
                  <TextField
                    label="Password"
                    type="password"
                    variant="outlined"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </FormControl>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  fullWidth
                  sx={{ mt: 2, textTransform: 'none' }}
                >
                  Login
                </Button>
              </form>
              {message && (
                <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                  {message}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
