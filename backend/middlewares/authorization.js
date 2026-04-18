require("dotenv").config();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const authorization = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token missing" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        if(!decoded.id){
            return res.status(401).json({ message: "Invalid token" });
        }
        req.user = { id: decoded.id };
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(401).json({ message: "Invalid token" });
    } 
}
module.exports = authorization;