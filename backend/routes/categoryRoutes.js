import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware";
import asyncHandler from "../middlewares/asyncHandler";
const router = express.Router()


router.route("/").post(createCategory);


export default router;