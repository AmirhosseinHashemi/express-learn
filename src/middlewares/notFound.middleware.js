import NotFoundError from "../errors/NotFoundError.js";

export default function notFoundMiddleware(req, res, next) {
  next(new NotFoundError());
}
