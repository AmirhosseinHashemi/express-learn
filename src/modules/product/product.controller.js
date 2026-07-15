import { productService } from "./product.service.js";
import { sendSuccessResponse } from "../../utils/response.js";

export const productController = {
  getAllProduct(req, res) {
    const allProduct = productService.getAllProduct();
    sendSuccessResponse(res, { message: "All product", data: allProduct });
  },

  getProductById(req, res, next) {
    const productId = req.params.id;
    const product = productService.getProductById(productId);

    sendSuccessResponse(res, {
      message: `product with id ${productId}`,
      data: product,
    });
  },

  creatNewProduct(req, res) {
    const payload = req.body;
    return productService.createNewProduct(payload);
  },
};
