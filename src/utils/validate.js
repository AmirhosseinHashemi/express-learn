import ValidationError from "../errors/ValidationError.js";

export default function validate({ bodySchema }) {
  return (req, res, next) => {
    const body = req.body;
    const result = bodySchema.safeParse(body);

    if (!result.success) {
      const details = result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      }));

      next(new ValidationError(details));
    }

    req.body = result.data;
    next();
  };
}
