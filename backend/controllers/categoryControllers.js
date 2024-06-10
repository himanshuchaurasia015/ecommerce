import asyncHandler from '../middlewares/asyncHandler';
import Category from '../models/categoryModel';

const createCategory= asyncHandler(async(req,res)=>{
    try {
        


    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
});


export {createCategory}