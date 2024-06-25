import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.fontFamily = 'Arial, sans-serif';
    document.body.style.background = '#121212';
    document.body.style.color = '#fff';
    document.body.style.display = 'flex';
    document.body.style.justifyContent = 'center';
    document.body.style.alignItems = 'center';
    document.body.style.height = '100vh';
    document.body.style.webkitFontSmoothing = 'antialiased';
    document.body.style.mozOsxFontSmoothing = 'grayscale';
  
    return () => {
      document.body.style = ''; // Clear the styles when the component unmounts
    };
  }, []);

  return(
  <div className="home-container">
    <header className="header">
      <h1>Welcome to FitLife</h1>
      <p>Your journey to a healthier, stronger, and better you starts here.</p>
    </header>
    <div className="button-container">
      <Link to="/login" className="btn">Login</Link>
      <Link to="/register" className="btn">Register</Link>
    </div>
    <section className="fitness-info">
      <div className="feature">
        <h2>Why Choose FitLife?</h2>
        <ul>
          <li>Personalized workout plans tailored to your goals</li>
          <li>Track your progress and stay motivated</li>
          <li>Join a community of fitness enthusiasts</li>
          <li>Expert tips and advice from fitness professionals</li>
          <li>Achieve your goals with structured, effective routines</li>
        </ul>
      </div>
      <div className="feature">
        <h2>Our Mission</h2>
        <ul>
        <li>At FitLife, we are committed to helping you achieve your fitness goals through personalized guidance, innovative workout routines, and community support. Join us today and start your journey towards a healthier lifestyle.</li>
        </ul>
      </div>
    </section>
    <footer className="footer">
      <p>&copy; 2024 FitLife By Hithesh. All rights reserved.</p>
    </footer>
  </div>
  )
};

export default HomePage;

