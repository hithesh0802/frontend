import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './components/Dashboard.js';
import WorkoutForm from './components/WorkoutForm.js';
import SocialFeed from './components/SocialFeed.js';
import './App.css';
const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path='/workouts' element={<WorkoutForm />}></Route>
      <Route path='/socialfeed' element={<SocialFeed></SocialFeed>}></Route>
    </Routes>
  </Router>
);

export default App;
