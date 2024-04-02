import authorRoute from "./author.route";
import { Router, Request, Response, NextFunction } from "express";
import bookInstanceRoute from "./book_instance.route";
import bookRoute from "./book.route";
import genreRoute from "./genre.route";
const router: Router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.render("index", { title: "Express" });
});
router.use("/authors", authorRoute);
router.use("/books", bookRoute);
router.use("/book-instances", bookInstanceRoute);
router.use("/genres", genreRoute);

export default router;
