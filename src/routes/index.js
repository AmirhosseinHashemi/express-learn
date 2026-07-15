import express from "express";
import productRouter from "../modules/product/product.routes.js";

const router = express.Router();

router.use("/products", productRouter);

export default router;
