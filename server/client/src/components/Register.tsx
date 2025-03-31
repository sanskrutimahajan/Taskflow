// client/src/components/Register.tsx
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import api from '../api';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/register', { username, password, email });
      if (res.status === 201) {
        setMessage('Registration successful!');
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Registration failed.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        // Use a background image with a dark overlay for a vibrant look
        background: 'url(/background-image.jpg) no-repeat center center',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      {/* Overlay to darken the background */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        }}
      />
      <Container sx={{ zIndex: 2 }}>
        <Card sx={{ borderRadius: 3, boxShadow: 10, overflow: 'hidden' }}>
          {/* Header with a vibrant gradient */}
          <Box
            sx={{
              background: 'linear-gradient(45deg, #FF6B6B, #FFD93D)',
              p: 3,
              textAlign: 'center',
            }}
          >
            <Typography variant="h4" sx={{ color: 'white', fontWeight: 'bold' }}>
              Create Your Account
            </Typography>
          </Box>
          <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleRegister}>
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
              <FormControl fullWidth margin="normal">
                <TextField
                  label="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <Button
                variant="contained"
                type="submit"
                fullWidth
                sx={{ mt: 3, py: 1.5, textTransform: 'none' }}
              >
                Register
              </Button>
            </form>
            {message && (
              <Typography variant="body1" color="error" sx={{ mt: 2, textAlign: 'center' }}>
                {message}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Register;
