import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { createCategory } from "../controllers/categoryControllers.js";
const router = express.Router()

router.route("/").post(createCategory);


export default router;