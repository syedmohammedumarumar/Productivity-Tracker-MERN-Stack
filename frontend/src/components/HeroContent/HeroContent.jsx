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
          <p>Organize tasks efficiently with our intuitive todo management system</p>
          <ul className="feature-list">
            <li>Create multiple task lists</li>
            <li>Set priorities and due dates</li>
            <li>Track completion status</li>
            <li>Add notes and subtasks</li>
          </ul>
        </div>

        <div className="feature-card">
          <div className="feature-icon">📊</div>
          <h3>Activity Tracking</h3>
          <p>Monitor your daily progress and visualize your productivity patterns</p>
          <ul className="feature-list">
            <li>Daily activity summaries</li>
            <li>Progress visualization</li>
            <li>Performance analytics</li>
            <li>Custom goal setting</li>
          </ul>
        </div>

        <div className="feature-card">
          <div className="feature-icon">🔥</div>
          <h3>Streak Board</h3>
          <p>Stay motivated by maintaining and tracking your daily streaks</p>
          <ul className="feature-list">
            <li>Daily streak counter</li>
            <li>Achievement badges</li>
            <li>Weekly challenges</li>
            <li>Personal best records</li>
          </ul>
        </div>
      </div>

      <div className="features-cta">
        <h2>Ready to boost your productivity?</h2>
        <p>Join thousands of users who have improved their task management</p>
        <Link to="/register" className="cta-button primary">Start Free Trial</Link>
      </div>
    </div>
  );
};

export default HeroContent;
