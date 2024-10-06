// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import { LoginButton } from '../components/LoginButton';

// Create the AuthContext
export const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  // State to hold the current user; null means not authenticated
  const [currentUser, setCurrentUser] = useState(null);

  // LogoutButton function
  const LogoutButton = async () => {
    setCurrentUser(null);

    const domain = "dev-he67ed27e5efteag.us.auth0.com";
    const clientId = "UOUG6NsewHiGB1NfAqCfpV3p9EbNPGHy";
    const returnTo = "http://localhost:3000/tasks";

    const reponse = await fetch(
      `https://${domain}/logout?
      clientId=${clientId}&
      returnTo=${returnTo}`,
      { redirect: "manual" }
    );
    window.location.replace(response.url);
  };

  return (
    <AuthContext.Provider value={{ currentUser, LoginButton, LogoutButton }}>
      {children}
    </AuthContext.Provider>
  );
};
