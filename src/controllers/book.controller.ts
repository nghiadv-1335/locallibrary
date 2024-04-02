import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

// Display list of all books.
export const getBooks = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Get list of books");
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
