// src/pages/Login.js
import React, { useState, useContext } from 'react';
import { LoginButton, Container, Typography, TextField, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { currentUser, login } = useContext(AuthContext);
  const [username, setUsername] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(username);
    navigate('/dashboard');
  };

  // If already logged in, redirect to dashboard
  if (currentUser) {
    navigate('/dashboard');
    return null;
  }

  return (
    <Container maxWidth="sm" style={{ marginTop: '100px' }}>
      <Box
        component="form"
        onSubmit={handleLogin}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to StudySync
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <LoginButton />
      </Box>
    </Container>
  );
};

export default Login;
