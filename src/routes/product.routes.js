import express from "express";
import { productController } from "../controllers/product.controller.js";
import asyncHandler from "../utils/asyncHandler.js";

const productRouter = express.Router();

productRouter.get("/", asyncHandler(productController.getAllProduct));

productRouter.get("/:id", asyncHandler(productController.getProductById));

export default productRouter;
