import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";

// Display list of all genres.
export const getGenres = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Get list of genres");
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
    res.send(`NOT IMPLEMENTED: Genre detail: ${req.params.id}`);
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
