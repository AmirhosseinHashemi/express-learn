import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { FRONT_END_ROUTE } from "./config/constant.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import router from "./routes/index.js";

const app = express();

app.use(
  cors({
    origin: FRONT_END_ROUTE,
    credentials: true
  }),
);

app.use(cookieParser());

app.use(express.json());

app.use("/api", router);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
