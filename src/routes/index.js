import express from "express";
import productRouter from "../modules/product/product.routes.js";
import userRouter from "../modules/users/user.route.js";

const router = express.Router();

router.use("/products", productRouter);
router.use("/users", userRouter);

export default router;
