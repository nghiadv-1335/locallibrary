import { Router } from "express";
import * as genreController from "../controllers/genre.controller";
const router: Router = Router();

router.get("/", genreController.getGenres);

router.get("/create", genreController.getCreateGenre);
router.post("/create", genreController.createGenre);

router.get("/:id/delete", genreController.getDeleteGenre);
router.post("/:id/delete", genreController.deleteGenre);

router.get("/:id/update", genreController.getUpdateGenre);
router.post("/:id/update", genreController.updateGenre);

router.get("/:id", genreController.getGenreDetails);

export default router;
