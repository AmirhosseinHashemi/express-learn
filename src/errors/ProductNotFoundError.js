import AppError from "./AppError.js";

export default class ProductNotFoundError extends AppError {
  constructor(id) {
    super({
      message: `Product with id ${id} not found.`,
      statusCode: 404,
      errorCode: "PRODUCT_NOT_FOUND",
      details: {
        productId: id,
      },
    });
  }
}
