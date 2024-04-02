import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../config/typeorm";
import { Author } from "../entities/author.entity";
import { Book } from "../entities/book.entity";
import { BookInstance } from "../entities/book_instance.entity";
import { Genre } from "../entities/genre.entity";
import { BookInstanceStatus } from "../common/constants";
import asyncHandler from "express-async-handler";

const bookRepository = AppDataSource.getRepository(Book);
const authorRepository = AppDataSource.getRepository(Author);
const genreRepository = AppDataSource.getRepository(Genre);
const bookInstanceRepository = AppDataSource.getRepository(BookInstance);

//Display general information for home page
export const index = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const [
      numBooks,
      numBookInstances,
      availableBookInstances,
      numAuthors,
      numGenres,
    ] = await Promise.all([
      bookRepository.count(),
      bookInstanceRepository.count(),
      bookInstanceRepository.findAndCount({
        where: { status: BookInstanceStatus.AVAILABLE },
      }),
      authorRepository.count(),
      genreRepository.count(),
    ]);
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
