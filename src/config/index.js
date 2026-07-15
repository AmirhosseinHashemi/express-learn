import env from "./env.js";
import validateEnv from "./validateEnv.js";

const errors = validateEnv(env);

if (errors.length > 0) {
  throw new Error(errors.map((e) => `${e.field}: ${e.message}`).join("\n"));
}

export default env;
