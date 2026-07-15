export default function validateEnv(env) {
  const port = env.port;
  const errors = [];

  if (port === undefined)
    errors.push({
      field: "port",
      message: "port is required",
    });

  if (!(typeof port === "number") || isNaN(port))
    errors.push({
      field: "port",
      message: "port must be a number",
    });

  return errors;
}
