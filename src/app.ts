import express, { Application } from "express";
import cors from "cors";
import { userRouter } from "./app/modules/User/user.routes";
import { adminRoutes } from "./app/modules/Admin/admin.routes";

const app: Application = express();

app.use(cors());

// pparser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World!!!!");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRoutes);
export default app;
