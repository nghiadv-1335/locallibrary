import { Request, Response, NextFunction } from "express";
import * as GenreService from "../services/genre.service";
import asyncHandler from "express-async-handler";
import {
  body,
  Result,
  ValidationError,
  validationResult,
} from "express-validator";
import { Genre } from "../entities/genre.entity";

// Validation for genre creating and updating.
const genreValidation = [
  body("name")
    .trim()
    .isLength({ min: 3 })
    .withMessage((_, { req }) => req.t("genre.min_length"))
    .custom(async (value, { req }) => {
      const genre = await GenreService.getGenreByName(value);
      if (genre) {
        throw new Error(req.t("genre.existing"));
      }
    })
    .escape(),
];

// Validate id and store genre for later middlewares.
const validateGenreId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    req.flash("error", req.t("genre.invalid"));
    return res.redirect("/genres");
  }
  const genre = await GenreService.getGenreDetails(id);
  if (genre === null) {
    req.flash("error", req.t("genre.not_found"));
    return res.redirect("/genres");
  }
  res.locals.genre = genre;
  next();
};

// Render genre form with errors
const handleError = async (req: Request, res: Response, next: NextFunction) => {
  res.render("genres/form", {
    title: res.locals.title,
    genre: res.locals.genre,
    errors: res.locals.errors,
  });
  return;
};

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
    res.render("genres/form", { title: req.t("genre.create") });
  }
);

// Create genre.
export const createGenre = [
  ...genreValidation,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    const genre = new Genre();
    genre.name = req.body.name;
    if (!errors.isEmpty()) {
      res.locals.title = req.t("genre.create");
      res.locals.genre = genre;
      res.locals.errors = errors.array();
      next();
    } else {
      await GenreService.saveGenre(genre);
      res.redirect(genre.url());
    }
  }),
  handleError,
];

// Display detail page for a specific genre.
export const getGenreDetails = [
  validateGenreId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genre = res.locals.genre;
    res.render("genres/details", { genre });
  }),
];

// Display update genre form.
export const getUpdateGenre = [
  validateGenreId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genre = res.locals.genre;
    res.render("genres/form", {
      title: req.t("genre.update"),
      genre,
    });
  }),
];

// Update specific genre.
export const updateGenre = [
  ...genreValidation,
  validateGenreId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    const genre = res.locals.genre;
    genre.name = req.body.name;
    if (!errors.isEmpty()) {
      res.locals.title = req.t("genre.update");
      res.locals.genre = genre;
      res.locals.errors = errors.array();
      next();
    }
    const updatedGenre = await GenreService.saveGenre(genre);
    res.redirect(updatedGenre.url());
  }),
  handleError,
];

// Get delete genre warning before deleting.
export const getDeleteGenre = [
  validateGenreId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genre = res.locals.genre;
    res.render("genres/delete", { genre });
  }),
];

// Delete specific genre.
export const deleteGenre = [
  validateGenreId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const genre = res.locals.genre;
    await GenreService.deleteGenre(genre.id);
    res.redirect("/genres");
  }),
];
