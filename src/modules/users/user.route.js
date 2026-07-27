import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../validators/validate.js";
import { userController } from "./user.controller.js";
import { createUserSchema } from "./user.schema.js";

const userRouter = express.Router();

userRouter.get("/", asyncHandler(userController.getAllUser));
userRouter.get("/:id", asyncHandler(userController.getUserById));
userRouter.post(
  "/",
  validate(createUserSchema),
  asyncHandler(userController.createUser),
);
userRouter.patch("/:id", asyncHandler(userController.updateUser));

export default userRouter;
