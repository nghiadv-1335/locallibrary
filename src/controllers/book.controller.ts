import { Request, Response, NextFunction } from "express";
import * as BookService from "../services/book.service";
import asyncHandler from "express-async-handler";
import { BookInstanceStatus } from "../common/constants";

//Display general information for home page
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
    res.send("NOT IMPLEMENTED: Get create book form");
  }
);

// Create book.
export const createBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Create book");
  }
);

// Display detail page for a specific book.
export const getBookDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      req.flash("error", req.t('book.invalid'));
      return res.redirect("/books");
    }
    const book = await BookService.getBookDetails(id);
    if (book === null) {
      req.flash("error", req.t('book.not_found'));
      return res.redirect("/books");
    }
    res.render("books/details", {
      book,
      book_instances: book?.book_instances,
      book_genres: book?.genres,
      book_instance_status: BookInstanceStatus,
    });
  }
);

// Update specific book.
export const updateBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Update book: ${req.params.id}`);
  }
);

// Delete specific book.
export const deleteBook = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Delete book: ${req.params.id}`);
  }
);
