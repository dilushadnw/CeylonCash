import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import './Auth.css';

const Login = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
    } catch (err) {
      setError('Failed to log in. ' + err.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to CeylonCash</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={loading}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p className="toggle-form">
          Don't have an account? 
          <button onClick={onToggleForm} className="link-button">Sign Up</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
