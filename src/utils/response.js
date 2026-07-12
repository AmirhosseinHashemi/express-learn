export function sendSuccessResponse(
  res,
  { statusCode = 200, message = "", data = null } = {},
) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}
