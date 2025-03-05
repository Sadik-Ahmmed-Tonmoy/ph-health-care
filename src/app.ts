import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import router from "./app/routes";
import status from "http-status";

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello Dev!!!!");
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

app.use((req:Request, res: Response, next:NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: "API not found",
    error: {
      path: req.originalUrl,
      message: "Your requested API is not found",
    }
  });
})

export default app;
