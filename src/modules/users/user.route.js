import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../utils/validate.js";
import { userController } from "./user.controller.js";
import {
  createUserSchema,
  getUserParamsSchema,
  getUsersQuerySchema,
} from "./user.schema.js";
import { authorize } from "../../middlewares/authorize.middleware.js";
import { PERMISSIONS } from "../../config/permissions.js";

const userRouter = express.Router();

userRouter.get(
  "/",
  validate({ query: getUsersQuerySchema }),
  asyncHandler(userController.getAllUser),
);
userRouter.get(
  "/:id",
  validate({ params: getUserParamsSchema }),
  asyncHandler(userController.getUserById),
);
userRouter.post(
  "/",
  validate({ bodySchema: createUserSchema }),
  asyncHandler(userController.createUser),
);
userRouter.patch("/:id", asyncHandler(userController.updateUser));
userRouter.delete(
  "/:id",
  authorize(PERMISSIONS.USER_DELETE),
  asyncHandler(userController.deleteUser),
);

export default userRouter;
