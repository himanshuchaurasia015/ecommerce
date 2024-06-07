import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const createUser= asyncHandler(async(req,res)=>{
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
    }
    const userExists = await User.findOne({ email });
if (userExists) res.status (400).send("User already exists");

});

export {createUser}