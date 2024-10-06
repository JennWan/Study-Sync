// src/components/FriendList.js
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import axios from 'axios';

const FriendList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Fetch friends from API
    const fetchFriends = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks'); // Update with your API endpoint
        setFriends(response.data);
      } catch (error) {
        console.error('Error fetching friends:', error);
      }
    };
    fetchFriends();
  }, []);

  const handleRemove = async (friendId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${friendId}`); // Update with your API endpoint
      setFriends(friends.filter((friend) => friend.id !== friendId));
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  if (friends.length === 0) {
    return <Typography>No friends added yet.</Typography>;
  }

  return (
    <List>
      {friends.map((friend) => (
        <ListItem
          key={friend.id}
          secondaryAction={
            <Button variant="outlined" color="secondary" onClick={() => handleRemove(friend.id)}>
              Remove
            </Button>
          }
        >
          <ListItemText primary={friend.username} secondary={friend.email} />
        </ListItem>
      ))}
    </List>
  );
};

export default FriendList;
