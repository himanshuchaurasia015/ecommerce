const { type } = require("express/lib/response")
const mongoose= require("mongoose")
const { required } = require("nodemon/lib/config")
const validator=require("validator")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")


const userSchema= new mongoose.Schema({

    name:{
        type: String,
        required:[true,"Please Enter Your Name"],
        minLength:[4, "Name should have more than 4 characters"],
        maxLength:[30, "Name can not exceed 30 characters"]
    },
    email:{
        type:String,
        required:[true,"Please enter Your Email"],
        unique:[true,"User Already Exists"],
        validate:[validator.isEmail, "Please Enter a Valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your Password"],
        minLength:[8,"Password should be greater than 8 characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});

userSchema.pre("save",async function (next){
    if(!this.isModified("password")){
        next()
    }
    this.password=await bcrypt.hash(this.password,10);
});

//jwt token

userSchema.methods.getJWTToken= function(){
    return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE,
    })
}

//Compare password

userSchema.methods.comparePassword= async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password);
}


module.exports=mongoose.model("User",userSchema);
