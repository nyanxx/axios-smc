import config from "./config";
import express from "express";
import { Application, Request, Response } from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import { udRouter } from "./routes/udRouter";

const app: Application = express();

app.use(express.json());

app.use(
  cors({
    origin: config.allowedOrigins,
    credentials: true,
  }),
);

app.use("/api", udRouter);

app.use(errorHandler);

app.use((_request: Request, response: Response) => {
  response
    .status(404)
    .json({ message: "No route found! check API documentation" });
});

export default app;
