import { productRepository } from "../repositories/product.repository.js";

export const productService = {
  getAllProduct() {
    return productRepository.getAllProducts();
  },
};
