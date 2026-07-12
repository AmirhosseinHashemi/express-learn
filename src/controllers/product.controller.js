import { productService } from "../services/product.service.js";

export const productController = {
  getAllProduct(req, res) {
    const allProduct = productService.getAllProduct();
    res.json(allProduct);
  },

  getProductById(req, res, next) {
    const product = productService.getProductById(req.params.id);
    return res.json(product);
  },
};
