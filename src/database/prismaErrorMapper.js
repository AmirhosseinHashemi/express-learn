import AppError from "../errors/AppError.js";
import { Prisma } from "../generated/prisma/client.ts";

export default function mapPrismaError(err) {
  if (!(err instanceof Prisma.PrismaClientKnownRequestError)) return err;

  if (err.code === "P2002") {
    const fields = err.meta?.driverAdapterError?.cause?.constraint?.fields;
    const message = Array.isArray(fields)
      ? `${fields.join(", ")} already exists`
      : "Duplicate value";

    return new AppError({
      message,
      statusCode: 409,
      errorCode: "DATABASE_DUPLICATE_ERROR",
      details: fields,
    });
  }

  if (err.code === "P2025") {
    return new AppError({
      message: "Resource not found",
      statusCode: 404,
      errorCode: "RESOURCE_NOT_FOUND",
    });
  }

  return err;
}
