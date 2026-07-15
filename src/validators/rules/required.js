export default function required({ fieldName, fieldValue, ruleValue, body }) {
  if (ruleValue && !(fieldName in body))
    return {
      field: fieldName,
      message: `field ${fieldName} is required.`,
    };

  return null;
}
