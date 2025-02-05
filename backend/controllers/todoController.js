const Todo = require('../models/todoModel.js')


//create a new todo
const createTodo = async(req,res)=>{
    try {
        const {title,description} = req.body;
        
        // Create todo with user reference
        const todo = await Todo.create({
            user: req.user, // This comes from the auth middleware
            title,
            description
        });

        res.status(201).json(todo);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getTodos = async(req,res)=>{
    try {
        const todos = await Todo.find({user:req.user});
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}


const getTodoById = async(req,res)=>{
    try {
        const todo = await Todo.findOne({_id:req.params.id,user:req.user})
        if(!todo){
            return res.status(404).json({message:'todo not found'})
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//update a todo
const updateTodo = async(req,res)=>{
   try {
    const todo = await Todo.findOne({_id:req.params.id,user:req.user});
    if(!todo){
        return res.status(404).json({message:"todo not found"});
    }
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id,req.body, {new:true});
    res.status(200).json(updatedTodo)
   } catch (error) {
    res.status(400).json({ message: error.message });
   }
}

const deleteTodo = async(req,res)=>{
    try {
        const todo = await Todo.findOne({_id:req.params.id,user:req.user});
    if(!todo){
        return res.status(404).json({message:"Todo not found"});
    }
    await Todo.findOneAndDelete({_id:req.params.id,user:req.user});
    res.status(200).json({message:"Todo Deleted Successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = { createTodo,getTodos,getTodoById,updateTodo,deleteTodo };