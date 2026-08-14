import { PERMISSIONS } from "../config/permissions.js";
import { ROLE, ROLE_PERMISSIONS } from "../config/role.js";
import ForbiddenError from "../errors/ForbiddenError.js";

export function authorize(permission) {
  return (req, res, next) => {
    const role = req?.user?.role ? ROLE[req?.user?.role] : "";
    if (!role) return next(new ForbiddenError());

    const permissions = ROLE_PERMISSIONS[role] ?? [];

    if (!permissions.includes(permission)) return next(new ForbiddenError());

    next();
  };
}
