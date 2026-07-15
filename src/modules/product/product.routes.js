import express from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../validators/validate.js";
import { productController } from "./product.controller.js";
import { createProductSchema } from "./product.schema.js";

const productRouter = express.Router();

productRouter.get("/", asyncHandler(productController.getAllProduct));

productRouter.get("/:id", asyncHandler(productController.getProductById));

productRouter.post(
  "/",
  validate(createProductSchema),
  asyncHandler(productController.creatNewProduct),
);

export default productRouter;
