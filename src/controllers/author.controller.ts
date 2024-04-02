import { Request, Response, NextFunction } from "express";
import * as AuthorService from "../services/author.service";
import asyncHandler from "express-async-handler";

// Display list of all authors.
export const getAuthors = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authors = await AuthorService.getAuthors();
    res.render("authors/index", { authors });
  }
);

// Display create author form.
export const getCreateAuthor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Get create author form");
  }
);

// Create author.
export const createAuthor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Create author");
  }
);

// Display detail page for a specific author.
export const getAuthorDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Author detail: ${req.params.id}`);
  }
);

// Update specific author.
export const updateAuthor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Update author: ${req.params.id}`);
  }
);

// Delete specific author.
export const deleteAuthor = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Delete author: ${req.params.id}`);
  }
);
