import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../utils/validate.js";
import { authController } from "./auth.controller.js";
import { loginUserSchema, registerUserSchema } from "./auth.schema.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  validate({ body: registerUserSchema }),
  asyncHandler(authController.registerUser),
);

authRouter.post(
  "/login",
  validate({ body: loginUserSchema }),
  asyncHandler(authController.loginUser),
);

export default authRouter;
