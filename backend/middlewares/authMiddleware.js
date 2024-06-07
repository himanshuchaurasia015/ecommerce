import asyncHandler from "./asyncHandler";

const authenticate= asyncHandler(async(req,res,next)=>{
    let token;

    token=req.cookie.jwt;

    if (token){
        try {

            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user=await User.findById(decoded.userId).select("-password");
            next();

            
        } catch (error) {

            res.status(401);
            throw new Error("Not Authorized");
            
        }
    }else{
        res.status(401);
        throw new Error("Not Authorized");

    }


});