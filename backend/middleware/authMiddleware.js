const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
    
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ message: 'Not authorized' });
    }
};

module.exports = { protect }; 