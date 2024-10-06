// src/components/FriendsActivity.js
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';
import axios from 'axios';

const FriendsActivity = () => {
  const [friendsTasks, setFriendsTasks] = useState([]);

  useEffect(() => {
    // Fetch friends' public tasks from API
    const fetchFriendsTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks'); // Update with your API endpoint
        setFriendsTasks(response.data);
      } catch (error) {
        console.error("Error fetching friends' tasks:", error);
      }
    };
    fetchFriendsTasks();
  }, []);

  if (friendsTasks.length === 0) {
    return <Typography>No friends' tasks to display.</Typography>;
  }

  return (
    <List>
      {friendsTasks.map((task) => (
        <ListItem key={task.id}>
          <ListItemText
            primary={task.description}
            secondary={`Deadline: ${task.deadline} | Difficulty: ${task.difficulty} | By: ${task.owner}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default FriendsActivity;
