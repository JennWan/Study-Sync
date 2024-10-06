// src/pages/Dashboard.js
import React, { useContext } from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TaskList from '../components/TaskList';
import FriendsActivity from '../components/FriendsActivity';
import { AuthContext } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useContext(AuthContext);

  const handleCreateTask = () => {
    navigate('/tasks/new');
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {currentUser.name}
      </Typography>
      <Button variant="outlined" color="secondary" onClick={logout} style={{ marginBottom: '20px' }}>
        Log Out
      </Button>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Your Tasks</Typography>
          <TaskList />
          <Button
            variant="contained"
            color="primary"
            onClick={handleCreateTask}
            style={{ marginTop: '10px' }}
          >
            Create Task
          </Button>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">Friends' Activity</Typography>
          <FriendsActivity />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;

