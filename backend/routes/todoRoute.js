const express = require('express')
const {createTodo,getTodos,getTodoById,updateTodo,deleteTodo} = require('../controllers/todoController.js')
const { protect } = require('../middleware/authMiddleware.js')

const todoRouter = express.Router();

// Protected route - only authenticated users can create todos
todoRouter.post('/add', protect, createTodo);
todoRouter.get('/get', protect, getTodos);
todoRouter.get('/getone/:id', protect, getTodoById);
todoRouter.put('/update/:id', protect, updateTodo);
todoRouter.post('/delete/:id', protect, deleteTodo);

module.exports = todoRouter;