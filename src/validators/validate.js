import ValidationError from "../errors/ValidationError.js";
import validators from "./rules/index.js";

export default function validate(schema) {
  return (req, res, next) => {
    const body = req.body;
    const errors = [];

    Object.entries(schema).forEach(([fieldName, rules]) => {
      const fieldValue = body[fieldName];

      let shouldStopCurrentField = false;

      const sortedRules = Object.entries(rules).sort((a, b) => {
        return validators[a[0]].priority - validators[b[0]].priority;
      });

      sortedRules.forEach(([ruleName, ruleValue]) => {
        if (shouldStopCurrentField) return;

        const validator = validators[ruleName];

        if (!validator) {
          throw new Error(`Unknown validation rule: ${ruleName}`);
        }

        const result = validator.handler({
          fieldName,
          fieldValue,
          ruleValue,
          body,
        });

        if (result) {
          errors.push(result);

          if (validator.stopOnFailure) {
            shouldStopCurrentField = true;
          }
        }
      });
    });

    if (errors.length > 0) throw new ValidationError(errors);
    else next();
  };
}
