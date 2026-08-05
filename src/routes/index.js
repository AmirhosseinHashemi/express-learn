import express from "express";
import authRouter from "../modules/auth/auth.route.js";
import productRouter from "../modules/product/product.routes.js";
import userRouter from "../modules/users/user.route.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.use("/products", authMiddleware, productRouter);
router.use("/users", authMiddleware, userRouter);
router.use("/auth", authRouter);

export default router;
