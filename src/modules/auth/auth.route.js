import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../utils/validate.js";
import { authController } from "./auth.controller.js";
import {
  loginUserSchema,
  refreshSchema,
  registerUserSchema,
} from "./auth.schema.js";

const authRouter = express.Router();

authRouter.get("/me", authMiddleware, asyncHandler(authController.me));

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

authRouter.post(
  "/refresh",
  validate({ body: refreshSchema }),
  asyncHandler(authController.refreshToken),
);

export default authRouter;
