import required from "./required.js";
import type from "./type.js";

export default {
  required: {
    handler: required,
    stopOnFailure: true,
    priority: 1,
  },

  type: {
    handler: type,
    stopOnFailure: true,
    priority: 2,
  },
};
