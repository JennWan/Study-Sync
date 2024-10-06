// src/components/Notifications.js
import React, { useContext } from 'react';
import { NotificationContext } from '../context/NotificationContext';
import { Snackbar, Alert } from '@mui/material';

const Notifications = () => {
  const { notifications, removeNotification } = useContext(NotificationContext);

  return (
    <>
      {notifications.map((notif) => (
        <Snackbar
          key={notif.id}
          open={true}
          autoHideDuration={6000}
          onClose={() => removeNotification(notif.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={() => removeNotification(notif.id)} severity={notif.type || 'info'} sx={{ width: '100%' }}>
            {notif.message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default Notifications;
