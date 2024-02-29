const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto=require("crypto");


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
    if (!email || !password){
        return next(new ErrorHandler("Please enter Email and password",400));
    }

    const user= await User.findOne({email}).select("+password");

    if (!user){
        return next(new ErrorHandler("Invalid Email or Password",401));
    }
    
    const isPasswordMatched= await user.comparePassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Email or Password",401))
    }

    const token= user.getJWTToken();

    sendToken(user, 200,res)

})



// logout user

exports.logout= catchAsyncErrors(async(req,res,next)=>{
    res.cookie("token",null ,{
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success:true,
        message:"Logged out successfully"
    });
});

//for forgot password

exports.forgetPassword=catchAsyncErrors(async(req, res,next)=>{

    const user = await User.findOne({email:req.body.email});

    if(!user){
        return next(new ErrorHandler("User does not exist",404))
    }

    //get resetPassword Token
    const resetToken= user.getResetPasswordToken() ;

    await user.save({validateBeforeSave: false}) ;

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    const message =` Your password reset token is :- \n\n ${resetPasswordUrl} \n\n If you have not requested this email then, please ignore it`;
    
    try{

        await sendEmail({
            email:user.email,
            subject: `Ecommerce Password Recovery`,
            message,

        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        })

    }catch(error){
        
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire=undefined;

        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.stack,500));
    }

}) 


//reset password
exports.resetPassword=catchAsyncErrors(async(req,res,next)=>{
    //creating token hash
    const resetPasswordToken=crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user=await User.findOne({resetPasswordToken,resetPasswordExpire:{$gt:Date.now()}});

    if(!user){
        return next(new ErrorHandler("Invalid token or has been expired",400));

    }

    if(req.body.password!=req.body.confirmPassword){
        return next(new ErrorHandler("Password does not match",400));

    }
    user.password=req.body.password;
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;

    await user.save()

    sendToken(user,200,res)

})


//get user detail
exports.getUserDetails=catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
   
    res.status(200).json({
        success: true,
        user,
    });

});


exports.upDatePassword=catchAsyncErrors(async(req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched= await user.comparePassword(req.body.oldPassword);

    if(!isPasswordMatched){
        return next(new ErrorHandler("Old Password is incorrect",400));

    }
    
   
    res.status(200).json({
        success: true,
        user,
    })
});