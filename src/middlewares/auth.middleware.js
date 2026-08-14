import UnauthorizedError from "../errors/UnauthorizedError.js";
import { verifyAccessToken } from "../lib/jwt.js";
import { extractBearerToken } from "../utils/token.js";

export default function authMiddleware(req, res, next) {
  const token = extractBearerToken(req.header("authorization"));

  if (!token) throw new UnauthorizedError();

  const payload = verifyAccessToken(token);
  req.user = {
    id: payload.userId,
    role: payload.role
  };

  next();
}
