const mongoose = require("mongoose")
// const { required } = require("nodemon/lib/config")
const productSchema= new mongoose.Schema({

    name:{type:String,
    required:[true, "Please enter product Name"]},
    description:{
        type:String,
    required:[true, "Please enter product Description"]
    },
    price:{type:String,
        required:[true, "Please enter product Price"]},
    rating:{
        type:Number,
        default:0
    },
    images:[{public_id:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    }
    }],
    category:{
        type:String,
        required:[true,"Please enter Category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[4,"Stock can not exceed 4 characters"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0

    },
    reviews:[{
        name:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        comment:{
            type:String,
            required:true
        },

    }],
    createdAt:{
        type:Date
        ,default:Date.now
    }

    


}) 
module.exports=mongoose.model("Product",productSchema)