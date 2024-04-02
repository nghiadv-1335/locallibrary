import { Router } from "express";
import * as bookInstanceController from "../controllers/book_instance.controller";
const router: Router = Router();

router.get("/", bookInstanceController.getBookInstances);

router.get("/create", bookInstanceController.getCreateBookInstance);
router.post("/create", bookInstanceController.createBookInstance);

router.get("/:id", bookInstanceController.getBookInstanceDetails);
router.put("/:id", bookInstanceController.updateBookInstance);
router.delete("/:id", bookInstanceController.deleteBookInstance);

export default router;
