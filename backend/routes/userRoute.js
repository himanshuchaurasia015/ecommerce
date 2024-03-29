const express=require("express");
const { registerUser, loginUser, logout, forgetPassword, resetPassword, getUserDetails} = require("../controllers/userControllers");
const {isAuthenticatedUser,authorizeRoles}= require("../middleware/auth")
const router=express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forgot").post(forgetPassword); 
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);






module.exports=router