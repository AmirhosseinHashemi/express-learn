export default function errorMiddleware(err, req, res, next) {
  return res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "An unknown error occurred.",
    code: err.errorCode || "INTERNAL_SERVER_ERROR",

    ...(err.details && {
      errors: err.details,
    }),
  });
}
