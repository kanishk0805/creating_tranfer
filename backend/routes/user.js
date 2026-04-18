const express = require('express');
const userRouter = express.Router();
const User = require("../models/user");
const JWT_SECRET = process.env.JWT_SECRET;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const zod = require("zod");
const authorization = require("../middlewares/authorization");
const Account = require("../models/account");

const registerSchema = zod.object({
    firstname: zod.string().min(1, "First name is required"),
    lastname: zod.string().min(1, "Last name is required"),
    email: zod.string().email("Invalid email format"),
    password: zod.string().min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character")
});

const updateSchema = zod.object({
    firstname: zod.string().min(1, "First name is required").optional(),
    lastname: zod.string().min(1, "Last name is required").optional(),
    password: zod.string().min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character").optional()
});
userRouter.get("/test",async (req, res) => {
    res.json({ message: "API is working!" });
});

userRouter.post("/register", async (req, res) => {
    
    const {success, error} = registerSchema.safeParse(req.body);
    console.log("Validation result:", { success, error });
    if(!success){
        console.error("Validation error:", error);
        return res.status(411).json({ message: error.errors.map(e => e.message).join(", ") });
    }

    const { firstname, lastname, email, password } = req.body;
    console.log("User registration request received with data:", req.body);
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    if(await User.findOne({ email })) {
        return res.status(411).json({ message: "User already exists" });
    }    
    let user;
    try {
        user = await User.create({ firstname, lastname, email, password: hashedPassword });
        await Account.create({ userId: user._id, balance: Math.floor(Math.random() * 10000) });
        
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ message: "Error creating user" });
    }
    
    console.log("User created:", user);
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(201).json({ token });
});
 
userRouter.put("/", authorization, async (req, res) => {
    const {firstname, lastname, password } = req.body;
    const {success, error} = updateSchema.safeParse(req.body);
    if(!success){
        console.error("Validation error:", error);
        return res.status(411).json({ message: error.errors.map(e => e.message).join(", ") });
    }
    let hashedPassword = undefined;
    if(password){ 
        hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
    }
    const user = await User.findByIdAndUpdate(req.user.id, { firstname, lastname, password: hashedPassword }, { new: true });
    if (!user) { 
        return res.status(404).json({ message: "User not found" });
    } 
    res.json({ message: "User updated successfully" }); 
});

userRouter.get("/bulk",authorization, async (req, res) => {
    let filter = req.query.filter || ""; 

    const users = await User.find({
            $or: [
                { firstname: { $regex: filter,$options: "i" } },
                { lastname: { $regex: filter,$options: "i" } }]
    },{
        firstname: 1,
        lastname: 1,
        email: 1,
        _id: 0
    });

    if (!users) {
        return res.status(404).json({ message: "Users not found" });
    }

    res.status(200).json(users);
});
module.exports = userRouter; 