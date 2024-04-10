import { Router } from "express";
import * as authorController from "../controllers/author.controller";
const router: Router = Router();

router.get("/", authorController.getAuthors);

router.get("/create", authorController.getCreateAuthor);
router.post("/create", authorController.createAuthor);

router.get("/:id/delete", authorController.getDeleteAuthor);
router.post("/:id/delete", authorController.deleteAuthor);

router.get("/:id/update", authorController.getUpdateAuthor);
router.post("/:id/update", authorController.updateAuthor);

router.get("/:id", authorController.getAuthorDetails);


export default router;
