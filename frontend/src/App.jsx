/**
 * Main Application Component
 * Handles client-side routing and protected route logic.
 */
import React from 'react';
/**
 * Main App Component
 * Handles routing and global layout structure.
 */
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Page Components
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import DreamLog from './pages/DreamLog';

// Simple route protection
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />

        <Route path="/dashboard" element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="/log" element={
          <PrivateRoute>
            <DreamLog />
          </PrivateRoute>
        } />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;
