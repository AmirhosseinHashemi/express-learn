import express from "express";
import { productController } from "../controllers/product.controller.js";
import asyncHandler from "../utils/asyncHandler.js";
import { createProductSchema } from "../validators/schemas/product.schema.js";
import validate from "../validators/validate.js";

const productRouter = express.Router();

productRouter.get("/", asyncHandler(productController.getAllProduct));

productRouter.get("/:id", asyncHandler(productController.getProductById));

productRouter.post(
  "/",
  validate(createProductSchema),
  asyncHandler(productController.creatNewProduct),
);

export default productRouter;
