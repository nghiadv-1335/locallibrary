import { Request, Response, NextFunction } from "express";
import * as AuthorService from "../services/author.service";
import asyncHandler from "express-async-handler";
import {
  Result,
  ValidationError,
  body,
  validationResult,
} from "express-validator";
import { Author } from "../entities/author.entity";

// Validation for author creating and updating.
const authorValidation = [
  body("f_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage((_, { req }) => req.t("author.fn_not_empty"))
    .escape(),
  body("fml_name")
    .trim()
    .isLength({ min: 1 })
    .withMessage((_, { req }) => req.t("author.fmln_not_empty"))
    .escape(),
  body("dob")
    .trim()
    .custom((value, { req }) => {
      if (value && new Date(value) > new Date()) {
        req.t("author.invalid_dob");
      } else return true;
    })
    .escape(),
  body("dod")
    .trim()
    .custom((value, { req }) => {
      if (value && new Date(value) > new Date()) {
        req.t("author.invalid_dod");
      } else return true;
    })
    .escape(),
];

// Validate id and store author for later middlewares.
const validateAuthorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    req.flash("error", req.t("author.invalid"));
    return res.redirect("/authors");
  }
  const author = await AuthorService.getAuthorDetails(id);
  if (author === null) {
    req.flash("error", req.t("author.not_found"));
    return res.redirect("/authors");
  }
  res.locals.author = author;
  next();
};

// Render author form with errors
const handleError = async (req: Request, res: Response, next: NextFunction) => {
  res.render("authors/form", {
    title: res.locals.title,
    author: res.locals.author,
    errors: res.locals.errors,
  });
  return;
};

// Display list of all authors.
export const getAuthors = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authors = await AuthorService.getAuthors();
    res.render("authors/index", { authors, messages: req.flash() });
  }
);

// Display create author form.
export const getCreateAuthor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.render("authors/form", { title: req.t("author.create") });
  }
);

// Create author.
export const createAuthor = [
  ...authorValidation,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    const author = new Author();
    author.first_name = req.body.f_name;
    author.family_name = req.body.fml_name;
    author.day_of_birth = req.body.dob.length > 0 ? req.body.dob : null;
    author.day_of_death = req.body.dod.length > 0 ? req.body.dod : null;
    if (!errors.isEmpty()) {
      res.locals.title = req.t("author.create");
      res.locals.errors = errors.array();
      next();
    }
    const createdAuthor = await AuthorService.saveAuthor(author);
    res.redirect(createdAuthor.url());
  }),
  handleError,
];

// Display detail page for a specific author.
export const getAuthorDetails = [
  validateAuthorId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const author = res.locals.author;
    res.render("authors/details", { author });
  }),
];

// Get update author form.
export const getUpdateAuthor = [
  validateAuthorId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const author = res.locals.author;
    res.render("authors/form", {
      title: req.t("author.update"),
      author,
    });
  }),
];

// Update specific author.
export const updateAuthor = [
  ...authorValidation,
  validateAuthorId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    const author = res.locals.author;
    author.first_name = req.body.f_name;
    author.family_name = req.body.fml_name;
    author.day_of_birth = req.body.dob.length > 0 ? req.body.dob : null;
    author.day_of_death = req.body.dod.length > 0 ? req.body.dod : null;
    if (!errors.isEmpty()) {
      res.locals.title = req.t("author.update");
      res.locals.errors = errors.array();
      next();
    }
    const updatedAuthor = await AuthorService.saveAuthor(author);
    res.redirect(updatedAuthor.url());
  }),
  handleError,
];

// Get delete author warning or constraint before deleting.
export const getDeleteAuthor = [
  validateAuthorId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const author = res.locals.author;
    res.render("authors/delete", { author, books: author.books });
  }),
];

// Delete specific author.
export const deleteAuthor = [
  validateAuthorId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const author = res.locals.author;
    if (author.books.length > 0) {
      res.render("authors/delete", { author, authors: author.books });
    } else {
      await AuthorService.deleteAuthor(author.id);
      res.redirect("/authors");
    }
  }),
];
