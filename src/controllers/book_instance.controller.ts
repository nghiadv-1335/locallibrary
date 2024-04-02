import { Request, Response, NextFunction } from "express";
import asyncHandler from "express-async-handler";
import { BookInstanceStatus } from "../common/constants";
import * as BookInstanceService from "../services/book_instance.service";

// Display list of all book instances.
export const getBookInstances = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const bookInstances = await BookInstanceService.getBookInstances();
    res.render("book_instances/index", {
      book_instances: bookInstances,
      book_instance_status: BookInstanceStatus,
    });
  }
);

// Display create book instance form.
export const getCreateBookInstance = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Get create book instance form");
  }
);

// Create book instance.
export const createBookInstance = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send("NOT IMPLEMENTED: Create book instance");
  }
);

// Display detail page for a specific book instance.
export const getBookInstanceDetails = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Book instance detail: ${req.params.id}`);
  }
);

// Update specific book instance.
export const updateBookInstance = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Update book instance: ${req.params.id}`);
  }
);

// Delete specific book instance.
export const deleteBookInstance = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send(`NOT IMPLEMENTED: Delete book instance: ${req.params.id}`);
  }
);
