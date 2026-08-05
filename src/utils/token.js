export function extractBearerToken(header) {
  if (!header) return null;

  const [type, token] = header.split(" ");

  if (type !== "Bearer") return null;

  return token;
}
