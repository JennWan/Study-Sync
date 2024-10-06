// src/components/TaskForm.js
import React, { useState } from 'react';
import { TextField, Checkbox, FormControlLabel, Button, Container, Typography, Box, MenuItem } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TaskForm = () => {
  const [task, setTask] = useState({ description: '', deadline: '', difficulty: 'Easy', isPublic: false });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/tasks', task); 
      navigate('/tasks');
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '50px' }}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          Create New Task
        </Typography>
        <TextField
          label="Task Description"
          variant="outlined"
          required
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <TextField
          label="Deadline"
          type="date"
          variant="outlined"
          required
          value={task.deadline}
          onChange={(e) => setTask({ ...task, deadline: e.target.value })}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Difficulty"
          variant="outlined"
          select
          SelectProps={{
            native: true,
          }}
          value={task.difficulty}
          onChange={(e) => setTask({ ...task, difficulty: e.target.value })}
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </TextField>
        <FormControlLabel
          control={
            <Checkbox
              checked={task.isPublic}
              onChange={(e) => setTask({ ...task, isPublic: e.target.checked })}
            />
          }
          label="Public Task"
        />
        <Button type="submit" variant="contained" color="primary">
          Create Task
        </Button>
      </Box>
    </Container>
  );
};

export default TaskForm;
