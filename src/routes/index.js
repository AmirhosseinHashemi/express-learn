import express from "express";
import productRouter from "./product.routes.js";
import userRouter from "./user.routes.js";

const router = express.Router();

router.use("/products", productRouter);
router.use("/users", userRouter);

export default router;
