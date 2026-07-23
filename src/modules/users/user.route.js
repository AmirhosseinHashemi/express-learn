import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import { userController } from "./user.controller.js";

const userRouter = express.Router();

userRouter.get("/", asyncHandler(userController.getAllUser));

export default userRouter;
