import { Router } from "express";
import * as authorController from "../controllers/author.controller";
const router: Router = Router();

router.get("/", authorController.getAuthors);

router.get("/create", authorController.getCreateAuthor);
router.post("/create", authorController.createAuthor);

router.get("/:id", authorController.getAuthorDetails);
router.put("/:id", authorController.updateAuthor);
router.delete("/:id", authorController.deleteAuthor);

export default router;
