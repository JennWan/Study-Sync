// src/components/AddFriend.js
import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import axios from 'axios';

const AddFriend = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');

  const handleAddFriend = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/tasks', { email, username }); // Update with your API endpoint
      setEmail('');
      setUsername('');
      // Optionally refresh the friend list or show a success message
      alert('Friend added successfully!');
    } catch (error) {
      console.error('Error adding friend:', error);
    }
  };

  return (
    <Box component="form" onSubmit={handleAddFriend} sx={{ display: 'flex', flexDirection: 'column', gap: 2, marginTop: 4 }}>
      <Typography variant="h6">Add a New Friend</Typography>
      <TextField
        label="Friend's Username"
        variant="outlined"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Friend's Email"
        variant="outlined"
        required
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Friend
      </Button>
    </Box>
  );
};

export default AddFriend;
