import ProductNotFoundError from "../errors/ProductNotFoundError.js";
import { productRepository } from "../repositories/product.repository.js";

export const productService = {
  getAllProduct() {
    return productRepository.getAllProducts();
  },

  getProductById(id) {
    const product = productRepository.getProductById(id);

    if (!product) throw new ProductNotFoundError(id);

    return product;
  },
};
