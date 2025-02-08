import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ActivityGrid.css';

const ActivityBox = ({ active }) => {
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (active) {
      setBlink(true);
      const timer = setTimeout(() => setBlink(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [active]);

  return (
    <div className={`day-box ${active ? 'active' : 'inactive'} ${blink ? 'blink' : ''}`}></div>
  );
};

const ActivityGrid = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      const response = await axios.get('/api/activities/get');
      setActivities(response.data);
    };

    fetchActivities();
  }, []);

  const days = Array.from({ length: 365 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date;
  }).reverse();

  return (
    <div className="progress-tracker">
      <div className="contribution-graph">
        {days.map((day, index) => {
          const activity = activities.find(activity => new Date(activity.date).toDateString() === day.toDateString());
          return <ActivityBox key={index} active={!!activity} />;
        })}
      </div>
    </div>
  );
};

export default ActivityGrid;