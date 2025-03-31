import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography } from '@mui/material';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            TaskFlow
          </Typography>
          <Button component={Link} to="/register" color="inherit">
            Register
          </Button>
          <Button component={Link} to="/login" color="inherit">
            Login
          </Button>
          <Button component={Link} to="/profile" color="inherit">
            Profile
          </Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/"
          element={
            <Typography variant="h3" sx={{ p: 2, textAlign: 'center' }}>
              Welcome to TaskFlow
            </Typography>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
