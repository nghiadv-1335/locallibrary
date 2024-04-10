import { Router } from "express";
import * as bookInstanceController from "../controllers/book_instance.controller";
const router: Router = Router();

router.get("/", bookInstanceController.getBookInstances);

router.get("/create", bookInstanceController.getCreateBookInstance);
router.post("/create", bookInstanceController.createBookInstance);

router.get("/:id/delete", bookInstanceController.getDeleteBookInstance);
router.post("/:id/delete", bookInstanceController.deleteBookInstance);

router.get("/:id/update", bookInstanceController.getUpdateBookInstance);
router.post("/:id/update", bookInstanceController.updateBookInstance);

router.get("/:id", bookInstanceController.getBookInstanceDetails);

export default router;
