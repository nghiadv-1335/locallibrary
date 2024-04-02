import { Request, Response, NextFunction } from "express";
import * as BookService from "../services/book.service";
import asyncHandler from "express-async-handler";

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
    res.render("books/index", { books });
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
    res.send(`NOT IMPLEMENTED: Book detail: ${req.params.id}`);
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
