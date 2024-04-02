import { Request, Response, NextFunction } from "express";
import * as GenreService from "../services/genre.service";
import asyncHandler from "express-async-handler";

// Display list of all genres.
export const getGenres = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const genres = await GenreService.getGenres();
    res.render("genres/index", { genres, messages: req.flash() });
  }
);

// Display create genre form.
export const getCreateGenre = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Get create genre form");
  }
);

// Create genre.
export const createGenre = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Create genre");
  }
);

// Display detail page for a specific genre.
export const getGenreDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      req.flash("error", req.t('genre.invalid'));
      return res.redirect("/genres");
    }
    const genre = await GenreService.getGenreDetails(id);
    if (genre === null) {
      req.flash("error", req.t('genre.not_found'));
      return res.redirect("/genres");
    }
    res.render("genres/details", { genre });
  }
);

// Update specific genre.
export const updateGenre = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Update genre: ${req.params.id}`);
  }
);

// Delete specific genre.
export const deleteGenre = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Delete genre: ${req.params.id}`);
  }
);
