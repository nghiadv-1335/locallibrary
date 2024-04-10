import cookieParser from "cookie-parser";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import router from "./routes/index";
import logger from "morgan";
import session from 'express-session';
import flash from 'connect-flash';
import i18next from 'i18next';
import i18nextBackend from 'i18next-fs-backend';
import i18nextMiddleware from 'i18next-http-middleware';
import { AppDataSource } from "./config/typeorm";

const port = process.env.PORT || 3000;

i18next
  .use(i18nextBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'vi',
    preload: ['vi', 'en'],
    supportedLngs: ['vi', 'en'],
    saveMissing: true,
    backend: {
      loadPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, 'locales/{{lng}}/{{ns}}.missing.json'),
    },
    detection: {
      order: ['querystring', 'cookie'],
      caches: ['cookie'],
      lookupQuerystring: 'locale', //query string on url (?locale=en/vi)
      lookupCookie: 'locale',
      ignoreCase: true,
      cookieSecure: false,
    }
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: 'locallibrary',
    cookie: { maxAge: 60000 },
  })
);
app.use(flash());

app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(i18nextMiddleware.handle(i18next));

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
