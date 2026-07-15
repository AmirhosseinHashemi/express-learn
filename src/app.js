import express from "express";
import errorMiddleware from "./middlewares/error.middleware.js";
import notFoundMiddleware from "./middlewares/notFound.middleware.js";
import router from "./routes/index.js";

const app = express();

app.use(express.json());

app.use("/api", router);

app.use(notFoundMiddleware);

app.use(errorMiddleware);

export default app;
