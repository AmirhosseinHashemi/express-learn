import { productService } from "../services/product.service.js";

export const productController = {
  getAllProduct(req, res) {
    const allProduct = productService.getAllProduct();
    res.json(allProduct);
  },
};
