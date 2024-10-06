// src/pages/Settings.js
import React, { useState } from 'react';
import { Container, Typography, FormControlLabel, Switch, Button, Box } from '@mui/material';
import axios from 'axios';

const Settings = ({ toggleTheme }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSave = async () => {
    try {
      await axios.put('http://localhost:3000/tasks', { darkMode, notificationsEnabled }); // Update with your API endpoint
      // Toggle theme if darkMode is enabled
      toggleTheme();
      // Optionally show a success message or update the UI
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
          }
          label="Dark Mode"
        />
        <FormControlLabel
          control={
            <Switch
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
            />
          }
          label="Enable Notifications"
        />
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Settings
        </Button>
      </Box>
    </Container>
  );
};

export default Settings;
