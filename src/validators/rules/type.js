export default function type({ fieldName, fieldValue, ruleValue, body }) {
  if (typeof fieldValue !== ruleValue)
    return {
      field: fieldName,
      message: `${fieldName} must be ${ruleValue}`,
    };

  return null;
}
