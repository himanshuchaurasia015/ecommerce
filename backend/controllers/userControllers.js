const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");


//register user
exports.registerUser= catchAsyncErrors(async(req,res,next)=>{
    const {name,email,password}= req.body
    const user = await User.create({
        name,email,password,avatar:{
            public_id:"this is simple id",
            url:"profileUrl"
        }
    });

    const token= user.getJWTToken();
    
    sendToken(user,200,res)
});


//login user

exports.loginUser= catchAsyncErrors(async(req,res,next)=>{

    const {email, password}=req.body;

    //checking email and password
    if (!email|| !password){
        return next(new ErrorHandler("Please enter Email and password",400));
    }
    const user= await User.findOne({email}).select("+password");

    if (!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    
    const isPasswordMatched= user.comparePassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    const token= user.getJWTToken();

    sendToken(user, 200,res)

})

