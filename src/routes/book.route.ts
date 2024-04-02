import { Router } from "express";
import * as bookController from "../controllers/book.controller";
const router: Router = Router();

router.get("/", bookController.getBooks);

router.get("/create", bookController.getCreateBook);
router.post("/create", bookController.createBook);

router.get("/:id", bookController.getBookDetails);
router.put("/:id", bookController.updateBook);
router.delete("/:id", bookController.deleteBook);

export default router;
