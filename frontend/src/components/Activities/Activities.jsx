import React, { useState, useEffect } from 'react';
import './Activities.css';
import axios from 'axios';

const BACKEND_URL = 'https://productivity-tracker-backend-0p7z.onrender.com';

const Activities = () => {
  const [showModal, setShowModal] = useState(false);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  // Simple alert replacement for toast
  const showAlert = (message, type = 'info') => {
    alert(message);
  };

  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      showAlert('Authentication token missing. Please log in again.');
      window.location.href = '/';
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    };

    const fetchActivities = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/activities/get`, config);
        setActivities(response.data);
      } catch (error) {
        showAlert(error.response?.data?.message || 'Error fetching activities', 'error');
        if (error.response?.status === 401) {
          localStorage.removeItem('userToken');
          window.location.href = '/';
        }
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setSelectedActivity(null);
    setFormData({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleShow = () => setShowModal(true);

  const handleSubmit = async () => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      showAlert('Authentication token missing. Please log in again.');
      window.location.href = '/';
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    };

    try {
      setLoading(true);
      if (selectedActivity) {
        await axios.put(
          `${BACKEND_URL}/api/activities/update/${selectedActivity._id}`,
          formData,
          config
        );
        showAlert('Activity updated successfully');
      } else {
        await axios.post(`${BACKEND_URL}/api/activities/add`, formData, config);
        showAlert('Activity added successfully');
      }
      
      const response = await axios.get(`${BACKEND_URL}/api/activities/get`, config);
      setActivities(response.data);

      handleClose();
    } catch (error) {
      showAlert(error.response?.data?.message || 'Error saving activity', 'error');
      if (error.response?.status === 401) {
        localStorage.removeItem('userToken');
        window.location.href = '/';
      }
    } finally {
      setLoading(false);
    }
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
    setFormData({
      title: activity.title,
      description: activity.description,
      date: new Date(activity.date).toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  const handleDelete = async (activityId) => {
    const userToken = localStorage.getItem('userToken');
    if (!userToken) {
      showAlert('Authentication token missing. Please log in again.');
      window.location.href = '/';
      return;
    }

    const config = {
      headers: {
        'Authorization': `Bearer ${userToken}`,
        'Content-Type': 'application/json'
      }
    };

    if (window.confirm('Are you sure you want to delete this activity?')) {
      try {
        setLoading(true);
        await axios.delete(`${BACKEND_URL}/api/activities/delete/${activityId}`, config);
        showAlert('Activity deleted successfully');

        const response = await axios.get(`${BACKEND_URL}/api/activities/get`, config);
        setActivities(response.data);
      } catch (error) {
        showAlert(error.response?.data?.message || 'Error deleting activity', 'error');
        if (error.response?.status === 401) {
          localStorage.removeItem('userToken');
          window.location.href = '/';
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="activities-container">
      <button className="add-button" onClick={handleShow} disabled={loading}>
        Add New Activity
      </button>

      {loading && <div className="loading">Loading...</div>}

      <div className="calendar-view">
        {activities.reverse().map(activity => (
          <div key={activity._id} className="activity-card">
            <h3>{activity.title}</h3>
            <p>{new Date(activity.date).toLocaleDateString()}</p>
            <div className="activity-actions">
              <button className="edit-button" onClick={() => handleActivityClick(activity)}>
               View <i className="fas fa-pencil-alt"></i> 
              </button>
              <button className="delete-button" onClick={() => handleDelete(activity._id)}>
              <i className="fas fa-trash"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2>{selectedActivity ? 'Update Activity' : 'Add New Activity'}</h2>
              <button className="close-button" onClick={handleClose}>&times;</button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    placeholder="Enter activity title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Date</label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Activities Description</label>
                  <textarea
                    rows={3}
                    placeholder="Enter your activities"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button className="button secondary" onClick={handleClose} disabled={loading}>
                Cancel
              </button>
              <button className="button primary" onClick={handleSubmit} disabled={loading}>
                {loading ? 'Saving...' : selectedActivity ? 'Update' : 'OK'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;
