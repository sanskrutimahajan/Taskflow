// src/components/Profile.tsx
import React, { useEffect, useState } from 'react';
import api from '../api';

interface UserData {
  id: string;
  username: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get('/auth/profile');
        setUser(response.data.user);
      } catch (error: any) {
        setMessage(error.response?.data?.message || 'Failed to load profile.');
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>User ID: {user.id}</p>
          <p>Username: {user.username}</p>
        </div>
      ) : (
        <p>{message || 'Loading...'}</p>
      )}
    </div>
  );
};

export default Profile;
