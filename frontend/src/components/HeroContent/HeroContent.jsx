import React from 'react';
import { Link } from 'react-router-dom';
import './HeroContent.css';

const HeroContent = () => {
  return (
    <div className="hero-container">
      <div className="hero-main">
        <h1>Track Your Progress, Achieve Your Goals 🎯</h1>
        <p className="hero-subtitle">
          Stay organized, monitor your activities, and build lasting habits with TaskTracker
        </p>
        <div className="cta-buttons">
          <Link to="/todo" className="cta-button primary">Get Started</Link>
          {/* <Link to="/todo" className="cta-button secondary">Try Demo</Link> */}
        </div>
      </div>

      <div className="features-grid">
      <div className="feature-card">
  <div className="feature-icon">📝</div>
  <h3>Smart Todo Lists</h3>
  <p>Stay productive with our To-Do List management system.</p>
  <ul className="feature-list">
    <li>Add and manage your tasks effortlessly</li>
    <li>Edit tasks to keep them up to date</li>
    <li>Delete completed or unnecessary tasks</li>
    <li>⚡ Boost productivity, stay organized</li>
  </ul>
 
</div>


<div className="feature-card">
  <div className="feature-icon">📊</div>
  <h3>Activity Tracking</h3>
  <p>Log your daily activities and review past progress anytime.</p>
  <ul className="feature-list">
    <li>Add and track your daily activities</li>
    <li>Review past activities anytime</li>
    <li>Set and achieve custom goals</li>
    <li>🔥 Stay consistent, analyze your progress</li>
  </ul>
  
</div>


       
      </div>

      <div className="features-cta">
        <h2>Ready to boost your productivity?</h2>
        <p> ✨ Elevate their learning and master time management.</p>
        <p className="login-message">🔒 Please log in to access these features.</p>
        <Link to="/todo" className="cta-button primary">Start Free Trial</Link>
      </div>
    </div>
  );
};

export default HeroContent;
