// client/src/components/Profile.tsx
import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Paper,
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
} from '@mui/material';
import api from '../api';

interface UserData {
  id: string;
  username: string;
  email?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get('/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUser(res.data.user);
      } catch (error: any) {
        setMessage(error.response?.data?.message || 'Failed to load profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #E8F5E9, #C8E6C9)',
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
              backgroundColor: 'primary.main',
              color: 'white',
              py: 3,
              textAlign: 'center',
            }}
          >
            <Avatar sx={{ margin: 'auto', width: 80, height: 80, mb: 1 }}>
              {user ? user.username.charAt(0).toUpperCase() : '?'}
            </Avatar>
            <Typography variant="h4">My Profile</Typography>
          </Box>
          <Card>
            <CardContent sx={{ p: 3 }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                  <CircularProgress />
                </Box>
              ) : user ? (
                <>
                  <Typography variant="body1">
                    <strong>User ID:</strong> {user.id}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Username:</strong> {user.username}
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 1 }}>
                    <strong>Email:</strong> {user.email}
                  </Typography>
                </>
              ) : (
                <Typography color="error" variant="body1">
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

export default Profile;
