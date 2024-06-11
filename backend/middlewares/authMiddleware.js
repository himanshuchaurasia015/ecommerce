import asyncHandler from "./asyncHandler.js";
import jwt from 'jsonwebtoken';
import User from "../models/userModel.js";

const authenticate= asyncHandler(async(req,res,next)=>{

    let token;

    token=req.cookies.jwt;

    

    if (token){
        try {

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.userId).select("-password");
            next();

            
        } catch (error) {

            res.status(401);
            console.log(error)
            throw new Error("Not Authorized, Token failed");
            
        }
    }else{
        res.status(401);
        throw new Error("Not Authorized");

    }


});


const authorizeAdmin=(req,res,next)=>{
    
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).send("Not Authorized Admin")
    }
}

export {authenticate,authorizeAdmin};