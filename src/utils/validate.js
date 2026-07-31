import ValidationError from "../errors/ValidationError.js";
import mapZodError from "./zodErrorMapper.js";

function assignValidatedData(req, key, value) {
  if (key === "query") {
    Object.defineProperty(req, "query", {
      value,
      configurable: true,
      enumerable: true,
    });

    return;
  }

  req[key] = value;
}

export default function validate({ body, query, params }) {
  return (req, res, next) => {
    const schemas = { body, query, params };

    for (const [key, schema] of Object.entries(schemas)) {
      if (!schema) continue;

      const result = schema.safeParse(req[key]);

      if (!result.success) {
        return next(new ValidationError(mapZodError(result.error)));
      }

      assignValidatedData(req, key, result.data);
    }

    next();
  };
}
