import express from "express";
import router from "./routes/index.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use("/api", router);

app.use(errorMiddleware);

export default app;
