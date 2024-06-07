import User from "../models/userModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import bcrypt from 'bcryptjs';
import createToken from "../utils/createToken.js";

const createUser= asyncHandler(async(req,res)=>{
    // console.log(req)
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
    throw new Error("Please fill all the inputs.");
    
    }
    const userExists = await User.findOne({ email });
if (userExists) return res.status (400).send("User already exists");

const salt = await bcrypt.genSalt(10);
const hashedPassword=await bcrypt.hash(password,salt);
const newUser=new User({username,email,password:hashedPassword});

try {
    await newUser.save();
    createToken(res,newUser._id);

   return res.status(201).json({
        _id: newUser._id,
        username: newUser._id,
        email: newUser.email,
        isAdmin: newUser.isAdmin
    });
    
} catch (error) {
    res.status(400);

    throw new Error("Invalid user data");

}

});


const loginUser= asyncHandler(async(req,res)=>{

    const {email,password}=req.body;
    const existingUser= await User.findOne({email})

    if (existingUser){
        const isPasswordValid=await bcrypt.compare(password,existingUser.password);

        if (isPasswordValid){

            createToken(res,existingUser._id);

            return res.status(201).json({
                _id: existingUser._id,
                username: existingUser._id,
                email: existingUser.email,
                isAdmin: existingUser.isAdmin
            });

        }
    }

});

const logoutCurrentUser= asyncHandler(async(req,res)=>{

    res.cookie('jwt','',{
        httpOnly: true,
        expires:new Date(0),
    });
    return res.status(200).json({
        message: "logged out successfully"
    })

});


export {createUser,loginUser,logoutCurrentUser}