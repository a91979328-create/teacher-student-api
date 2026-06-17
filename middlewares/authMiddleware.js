const jwt = require("jsonwebtoken")

const User = require('../models/User.js')

const authMiddleware = async (req, res, next) => {
    try {
        let token = req.header('auth-token');
        
        if (!token) {
            token = req.header('Authorization')?.split(' ')[1];
        }
        
        if(!token) return res.status(401).json({ message: "NOT Token provided" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id).select("-password");

        if(!user)  return res.status(404).json("User not found!, User no longer exists in DB.")
    
            req.user = user;
            next()
        } catch (error) {
         return res.status(401).json({ message: "Invalid Token"})
    }
}

module.exports = { authMiddleware };