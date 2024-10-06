// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Checkbox, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'; // Correct import
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks from API
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks'); 
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleToggle = (taskId) => {
    // Toggle task completion status
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    
  };

  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`); 
      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  if (tasks.length === 0) {
    return <Typography>No tasks available. Add a new task!</Typography>;
  }

  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          secondaryAction={
            <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.id)}>
              <DeleteIcon /> {/* Using the Delete icon */}
            </IconButton>
          }
        >
          <Checkbox
            edge="start"
            checked={task.completed}
            tabIndex={-1}
            disableRipple
            onChange={() => handleToggle(task.id)}
          />
          <ListItemText
            primary={task.description}
            secondary={`Deadline: ${task.deadline} | Difficulty: ${task.difficulty}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;

