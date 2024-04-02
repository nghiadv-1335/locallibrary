import { Router } from "express";
import * as genreController from "../controllers/genre.controller";
const router: Router = Router();

router.get("/", genreController.getGenres);

router.get("/create", genreController.getCreateGenre);
router.post("/create", genreController.createGenre);

router.get("/:id", genreController.getGenreDetails);
router.put("/:id", genreController.updateGenre);
router.delete("/:id", genreController.deleteGenre);

export default router;
