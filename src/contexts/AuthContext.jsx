import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth } from '../config/firebase';

// Create authentication context
const AuthContext = createContext();

// Hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// Authentication provider component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sign up function
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Login function
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Logout function
  const logout = () => {
    return signOut(auth);
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
