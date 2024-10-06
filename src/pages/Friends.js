// src/pages/Friends.js
import React from 'react';
import { Container, Typography } from '@mui/material';
import FriendList from '../components/FriendList';
import AddFriend from '../components/AddFriend';

const Friends = () => {
  return (
    <Container style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Your Friends
      </Typography>
      <AddFriend />
      <FriendList />
    </Container>
  );
};

export default Friends;
