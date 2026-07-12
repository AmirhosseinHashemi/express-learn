const products = [
  {
    id: 1,
    name: "product 1",
  },
];

export const productRepository = {
  getAllProducts() {
    return products;
  },

  getProductById(id) {
    return products.find((p => p.id === Number(id)));
  },
};
