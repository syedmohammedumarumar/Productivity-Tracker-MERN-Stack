import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todos.css';

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTodo, setNewTodo] = useState({
    title: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Backend URL
  const BACKEND_URL = 'https://productivity-tracker-backend-0p7z.onrender.com';

  // Configure axios with authentication header
  const getAuthConfig = () => {
    const token = localStorage.getItem('userToken'); // Changed from 'token' to 'userToken'
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

  // Fetch todos on component mount
  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${BACKEND_URL}/api/todo/get`, getAuthConfig());
      setTodos(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch todos');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTodo = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`${BACKEND_URL}/api/todo/add`, newTodo, getAuthConfig());
      setTodos([...todos, response.data]);
      setNewTodo({ title: '', description: '' });
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add todo');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.put(
        `${BACKEND_URL}/api/todo/update/${currentTodo._id}`, 
        newTodo, 
        getAuthConfig()
      );
      setTodos(todos.map(todo => 
        todo._id === currentTodo._id ? response.data : todo
      ));
      setNewTodo({ title: '', description: '' });
      setIsModalOpen(false);
      setIsEditing(false);
      setCurrentTodo(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update todo');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      setLoading(true);
      await axios.post(`${BACKEND_URL}/api/todo/delete/${id}`, {}, getAuthConfig());
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete todo');
    } finally {
      setLoading(false);
    }
  };

  const openEditModal = (todo) => {
    setCurrentTodo(todo);
    setNewTodo({ title: todo.title, description: todo.description });
    setIsEditing(true);
    setIsModalOpen(true);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-title">Todo List</h1>
      
      {error && <div className="error-message">{error} please Login</div>}
      
      <button 
        className="add-todo-btn"
        onClick={() => {
          setIsEditing(false);
          setCurrentTodo(null);
          setNewTodo({ title: '', description: '' });
          setIsModalOpen(true);
        }}
      >
        Add Todo +
      </button>

      {/* Modal for adding/editing todo */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{isEditing ? 'Edit Todo' : 'Add New Todo'}</h2>
            <form onSubmit={isEditing ? handleUpdateTodo : handleAddTodo}>
              <input
                type="text"
                placeholder="Title"
                value={newTodo.title}
                onChange={(e) => setNewTodo({...newTodo, title: e.target.value})}
                required
              />
              <textarea
                placeholder="Description"
                value={newTodo.description}
                onChange={(e) => setNewTodo({...newTodo, description: e.target.value})}
              />
              <div className="modal-buttons">
                <button type="submit" disabled={loading}>
                  {loading ? 'Loading...' : isEditing ? 'Update Todo' : 'Add Todo'}
                </button>
                <button 
                  type="button" 
                  onClick={() => {
                    setIsModalOpen(false);
                    setIsEditing(false);
                    setCurrentTodo(null);
                    setNewTodo({ title: '', description: '' });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Todo list */}
      <div className="todos-list">
        {loading && !todos.length ? (
          <div className="loading">Loading todos...</div>
        ) : (
          todos.map((todo) => (
            <div key={todo._id} className="todo-card">
              <div className="todo-content">
                <h3>{todo.title}</h3>
                <p>{todo.description}</p>
              </div>
              <div className="todo-actions">
                <button 
                  className="action-btn edit-btn"
                  onClick={() => openEditModal(todo)}
                >
                  <i className="fas fa-pencil-alt"></i>
                </button>
                <button 
                  className="action-btn delete-btn"
                  onClick={() => {
                    if(window.confirm('Are you sure you want to delete this todo?')) {
                      handleDeleteTodo(todo._id);
                    }
                  }}
                  disabled={loading}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
            </div>
          ))
        )}
        {!loading && todos.length === 0 && (
          <div className="no-todos">No todos found. Add your first todo!</div>
        )}
      </div>
    </div>
  );
};

export default Todos;
