import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import './App.css';

function AppContent() {
  const [showLogin, setShowLogin] = useState(true);
  const { currentUser } = useAuth();

  if (currentUser) {
    return <Dashboard />;
  }

  return showLogin ? (
    <Login onToggleForm={() => setShowLogin(false)} />
  ) : (
    <Signup onToggleForm={() => setShowLogin(true)} />
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
