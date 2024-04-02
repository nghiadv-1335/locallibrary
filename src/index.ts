import cookieParser from "cookie-parser";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import router from "./routes";
import logger from "morgan";
import { AppDataSource } from "./config/typeorm";

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));

app.use("/", router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500);
  res.render("error");
});
//...
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

AppDataSource.initialize()
  .then(async () => {
    console.log("Database initialized");
  })
  .catch((error) => console.log("Database connect failed: ", error));
