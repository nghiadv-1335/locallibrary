import authorRoute from "./author.route";
import { Router } from "express";
import bookInstanceRoute from "./book_instance.route";
import bookRoute from "./book.route";
import genreRoute from "./genre.route";
import { index } from "../controllers/book.controller";
const router: Router = Router();

router.get("/", index);
router.use("/authors", authorRoute);
router.use("/books", bookRoute);
router.use("/book-instances", bookInstanceRoute);
router.use("/genres", genreRoute);

export default router;
