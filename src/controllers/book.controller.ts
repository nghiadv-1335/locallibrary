import { Request, Response, NextFunction } from "express";
import * as BookService from "../services/book.service";
import * as GenreService from "../services/genre.service";
import * as AuthorService from "../services/author.service";
import asyncHandler from "express-async-handler";
import { BookInstanceStatus } from "../common/constants";
import {
  body,
  Result,
  ValidationError,
  validationResult,
} from "express-validator";
import { Author } from "../entities/author.entity";
import { Book } from "../entities/book.entity";

// Validation for book creating and updating.
const bookValidation = [
  (req: Request, res: Response, next: NextFunction) => {
    if (!Array.isArray(req.body.genres)) {
      req.body.genres =
        typeof req.body.genres === "undefined" ? [] : [req.body.genres];
    }
    next();
  },
  body("title")
    .trim()
    .isLength({ min: 1 })
    .withMessage((_, { req }) => req.t("book.title_not_empty"))
    .escape(),
  body("author")
    .trim()
    .isLength({ min: 1 })
    .withMessage((_, { req }) => req.t("book.author_not_empty"))
    .escape(),
  body("summary")
    .trim()
    .isLength({ min: 1 })
    .withMessage((_, { req }) => req.t("book.summary_not_empty"))
    .escape(),
  body("isbn")
    .trim()
    .isLength({ min: 1 })
    .withMessage((_, { req }) => req.t("book.isbn_not_empty"))
    .escape(),
  body("genres.*").escape(),
];

// Validate id and store book for later middlewares.
const validateBookId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    req.flash("error", req.t("book.invalid"));
    return res.redirect("/books");
  }
  const book = await BookService.getBookSimple(id);
  if (book === null) {
    req.flash("error", req.t("book.not_found"));
    return res.redirect("/books");
  }
  res.locals.book = book;
  next();
};

// Render book form with errors
const handleError = async (req: Request, res: Response, next: NextFunction) => {
  res.render("books/form", {
    title: res.locals.title,
    authors: res.locals.authors,
    genres: res.locals.genres,
    book: res.locals.book,
    errors: res.locals.errors,
  });
  return;
};

//Display general information for home page.
export const index = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const [
      numBooks,
      numBookInstances,
      availableBookInstances,
      numAuthors,
      numGenres,
    ] = await BookService.getGeneralInfo();
    res.render("index", {
      title: "Sun Asterisk",
      book_count: numBooks,
      book_instance_count: numBookInstances,
      book_instance_available_count: availableBookInstances[1], // count available bookInstance
      author_count: numAuthors,
      genre_count: numGenres,
    });
  }
);

// Display list of all books.
export const getBooks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const books = await BookService.getBooks();
    res.render("books/index", { books, messages: req.flash() });
  }
);

// Display create book form.
export const getCreateBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const [allAuthors, allGenres] = await Promise.all([
      AuthorService.getAuthors(),
      GenreService.getGenres(),
    ]);
    res.render("books/form", {
      title: req.t("book.create"),
      authors: allAuthors,
      genres: allGenres,
    });
  }
);

// Create book.
export const createBook = [
  ...bookValidation,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    const [allAuthors, allGenres] = await Promise.all([
      AuthorService.getAuthors(),
      GenreService.getGenres(),
    ]);
    const book = new Book();
    book.title = req.body.title;
    book.author = (await AuthorService.getAuthorById(
      +req.body.author
    )) as Author;
    book.summary = req.body.summary;
    book.isbn = req.body.isbn;
    book.genres = await GenreService.getGenresByIds(
      req.body.genres.map((item: string) => parseInt(item))
    );
    if (!errors.isEmpty()) {
      res.locals.title = req.t("book.create");
      res.locals.authors = allAuthors;
      res.locals.genres = allGenres;
      res.locals.book = book;
      res.locals.errors = errors.array();
      next();
    }
    const createdBook = await BookService.saveBook(book);
    res.redirect(createdBook.url());
  }),
  handleError,
];

// Display detail page for a specific book.
export const getBookDetails = [
  validateBookId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const book = await BookService.getBookDetails(parseInt(req.params.id));
    res.render("books/details", {
      book,
      book_instances: book?.book_instances,
      book_genres: book?.genres,
      book_instance_status: BookInstanceStatus,
    });
  }),
];

// Get update book form.
export const getUpdateBook = [
  validateBookId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const book = res.locals.book;
    const [allAuthors, allGenres] = await Promise.all([
      AuthorService.getAuthors(),
      GenreService.getGenres(),
    ]);
    res.render("books/form", {
      title: req.t("book.update"),
      authors: allAuthors,
      genres: allGenres,
      book: book,
    });
  }),
];

// Update specific book.
export const updateBook = [
  ...bookValidation,
  validateBookId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    const book = res.locals.book;
    book.title = req.body.title;
    book.author = (await AuthorService.getAuthorById(
      +req.body.author
    )) as Author;
    book.summary = req.body.summary;
    book.isbn = req.body.isbn;
    book.genres = await GenreService.getGenresByIds(
      req.body.genres.map((item: string) => parseInt(item))
    );
    if (!errors.isEmpty()) {
      const [allAuthors, allGenres] = await Promise.all([
        AuthorService.getAuthors(),
        GenreService.getGenres(),
      ]);
      res.locals.title = req.t("book.update");
      res.locals.authors = allAuthors;
      res.locals.genres = allGenres;
      res.locals.book = book;
      res.locals.errors = errors.array();
      next();
    }
    const updatedBook = await BookService.saveBook(book);
    res.redirect(updatedBook.url());
  }),
  handleError,
];

// Get delete book warning or constraint before deleting.
export const getDeleteBook = [
  validateBookId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const book = res.locals.book;
    res.render("books/delete", {
      book,
      book_instances: book.book_instances,
      book_instance_status: BookInstanceStatus,
    });
  }),
];

// Delete specific book.
export const deleteBook = [
  validateBookId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const book = res.locals.book;
    if (book.book_instances.length > 0) {
      res.render("books/delete", { book, book_instances: book.book_instances });
    } else {
      await BookService.deleteBook(book.id);
      res.redirect("/books");
    }
  }),
];
