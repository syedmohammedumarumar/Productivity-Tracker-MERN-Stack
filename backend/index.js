const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require('dotenv').config();

const todoRouter = require('./routes/todoRoute.js');
const userRouter = require('./routes/userRoute.js')
const activityRoutes = require('./routes/activityRoute.js')

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 5000;

// DB Connection
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/productivity-tracker")
    .then(() => console.log("DB connected"))
    .catch((err) => console.error("MongoDB connection error", err));

if (!process.env.JWT_SECRET) {
    console.error("WARNING: JWT_SECRET is not set in environment variables!");
}

// Routes Setup
app.use('/api/todo', todoRouter);
app.use('/api/users',userRouter);
app.use('/api/activities', activityRoutes);






app.get('/', (req, res) => {
    res.send("API working");
});

// Basic Error Handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});