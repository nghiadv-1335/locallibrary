import { Router } from "express";
import * as bookController from "../controllers/book.controller";
const router: Router = Router();

router.get("/", bookController.getBooks);

router.get("/create", bookController.getCreateBook);
router.post("/create", bookController.createBook);

router.get("/:id/delete", bookController.getDeleteBook);
router.post("/:id/delete", bookController.deleteBook);

router.get("/:id/update", bookController.getUpdateBook);
router.post("/:id/update", bookController.updateBook);

router.get("/:id", bookController.getBookDetails);

export default router;
