import React, { useState, useEffect } from 'react';
import './LoginPopup.css';
import axios from 'axios';

const BACKEND_URL = 'https://productivity-tracker-backend-0p7z.onrender.com';

const LoginPopup = ({ isOpen, onClose, onLoginSuccess }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('userToken');
    setIsLoggedIn(!!token);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Input Change - Name:', name, 'Value:', value);
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    console.log('Updated Form Data:', formData);
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!isLoginMode && !formData.name) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        const endpoint = isLoginMode ? '/api/users/login' : '/api/users/register';
        const response = await axios.post(`${BACKEND_URL}${endpoint}`, formData);
        
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('userName', response.data.name);
        localStorage.setItem('userId', response.data._id);

        console.log(isLoginMode ? 'Login successful' : 'Registration successful');
        
        onLoginSuccess(true);
        onClose();
        
        window.location.reload();
      } catch (error) {
        setErrors({
          submit: error.response?.data?.message || 'An error occurred. Please try again.'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    window.location.reload();
  };

  const toggleMode = () => {
    setIsLoginMode(prev => !prev);
    setFormData({
      name: '',
      email: '',
      password: ''
    });
    setErrors({});
  };

  if (!isOpen) return null;

  if (isLoggedIn) {
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <button className="close-button" onClick={onClose}>&times;</button>
          <h2>Account</h2>
          <button 
            className="submit-button"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        
        <h2>{isLoginMode ? 'Login' : 'Sign Up'}</h2>
        
        <form onSubmit={handleSubmit}>
          {!isLoginMode && (
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
          )}
          
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          
          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          {errors.submit && <div className="error-message">{errors.submit}</div>}
          
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Please wait...' : (isLoginMode ? 'Login' : 'Sign Up')}
          </button>
        </form>
        
        <p className="toggle-mode">
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <button className="toggle-button" onClick={toggleMode}>
            {isLoginMode ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPopup;
