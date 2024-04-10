import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { BookInstanceStatus } from "../common/constants";
import * as BookInstanceService from "../services/book_instance.service";
import * as BookService from "../services/book.service";
import {
  Result,
  ValidationError,
  body,
  validationResult,
} from "express-validator";
import { BookInstance } from "../entities/book_instance.entity";
import { Book } from "../entities/book.entity";

// Validation for book instance creating and updating.
const bookInstanceValidation = [
  body("imprint")
    .trim()
    .isLength({ min: 1 })
    .withMessage((_, { req }) => req.t("bookinstance.imprint_not_empty"))
    .escape(),
  body("due_back").escape(),
  body("status")
    .trim()
    .custom((value, { req }) => {
      if (!(<any>Object).values(BookInstanceStatus).includes(value))
        return req.t("bookinstance.invalid_status");
      else return true;
    })
    .escape(),
];

// Validate id and store book instance for later middlewares.
const validateBookInstanceId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    req.flash("error", req.t("bookinstance.invalid"));
    return res.redirect("/book-instances");
  }
  const book_instance = await BookInstanceService.getBookInstanceDetails(id);
  if (book_instance === null) {
    req.flash("error", req.t("bookinstance.not_found"));
    return res.redirect("/book-instances");
  }
  res.locals.book_instance = book_instance;
  next();
};

// Render book instance form with errors
const handleError = async (req: Request, res: Response, next: NextFunction) => {
  res.render("book_instances/form", {
    title: res.locals.title,
    book_instance: res.locals.book_instance,
    books: res.locals.books,
    book_instance_status: BookInstanceStatus,
    errors: res.locals.errors,
  });
  return;
};

// Display list of all book instances.
export const getBookInstances = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookInstances = await BookInstanceService.getBookInstances();
    res.render("book_instances/index", {
      book_instances: bookInstances,
      book_instance_status: BookInstanceStatus,
      messages: req.flash(),
    });
  }
);

// Display create book instance form.
export const getCreateBookInstance = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const allBooks = await BookService.getBooks();
    res.render("book_instances/form", {
      title: req.t("bookinstance.create"),
      books: allBooks,
      book_instance_status: BookInstanceStatus,
    });
  }
);

// Create book instance.
export const createBookInstance = [
  ...bookInstanceValidation,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    const allBooks = await BookService.getBooks();
    const bookInstance = new BookInstance();
    bookInstance.imprint = req.body.imprint;
    bookInstance.book = (await BookService.getBookDetails(
      +req.body.book
    )) as Book;
    bookInstance.due_back = req.body.due_back;
    bookInstance.status = req.body.status;
    if (
      !errors.isEmpty() ||
      (bookInstance.status !== BookInstanceStatus.AVAILABLE &&
        bookInstance.due_back.length === 0)
    ) {
      res.locals.title = req.t("bookinstance.create");
      res.locals.book_instance = bookInstance;
      res.locals.books = allBooks;
      res.locals.errors = errors.isEmpty()
        ? [{ msg: req.t("bookinstance.due_back_required") }]
        : errors.array();
      next();
    }
    const createdBookInstance = await BookInstanceService.saveBookInstance(
      bookInstance
    );
    res.redirect(createdBookInstance.url());
  }),
  handleError,
];

// Display detail page for a specific book instance.
export const getBookInstanceDetails = [
  validateBookInstanceId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const book_instance = res.locals.book_instance;
    res.render("book_instances/details", {
      book_instance,
      book_instance_status: BookInstanceStatus,
    });
  }),
];

// Get update book instance form.
export const getUpdateBookInstance = [
  validateBookInstanceId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const book_instance = res.locals.book_instance;
    const books = await BookService.getBooks();
    res.render("book_instances/form", {
      title: req.t("bookinstance.update"),
      books,
      book_instance_status: BookInstanceStatus,
      book_instance,
    });
  }),
];

// Update specific book instance.
export const updateBookInstance = [
  ...bookInstanceValidation,
  validateBookInstanceId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const errors: Result<ValidationError> = validationResult(req);
    const book_instance = res.locals.book_instance;
    const books = await BookService.getBooks();
    book_instance.imprint = req.body.imprint;
    book_instance.book = (await BookService.getBookDetails(
      +req.body.book
    )) as Book;
    book_instance.due_back = req.body.due_back;
    book_instance.status = req.body.status;
    if (
      !errors.isEmpty() ||
      (book_instance.status !== BookInstanceStatus.AVAILABLE &&
        book_instance.due_back.length === 0)
    ) {
      res.locals.title = req.t("bookinstance.update");
      res.locals.book_instance = book_instance;
      res.locals.books = books;
      res.locals.errors = errors.isEmpty()
        ? [{ msg: req.t("bookinstance.due_back_required") }]
        : errors.array();
      next();
    }
    const updatedBookInstance = await BookInstanceService.saveBookInstance(
      book_instance
    );
    res.redirect(updatedBookInstance.url());
  }),
  handleError,
];

// Get delete book instance warning before deleting.
export const getDeleteBookInstance = [
  validateBookInstanceId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const book_instance = res.locals.book_instance;
    res.render("book_instances/delete", {
      book_instance,
      book_instance_status: BookInstanceStatus,
    });
  }),
];

// Delete specific book instance.
export const deleteBookInstance = [
  validateBookInstanceId,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const book_instance = res.locals.book_instance;
    await BookInstanceService.deleteBookInstance(book_instance.id);
    res.redirect("/book-instances");
  }),
];
