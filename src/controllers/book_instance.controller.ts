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
      messages: req.flash()
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
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      req.flash("error", req.t('bookinstance.invalid'));
      return res.redirect("/book-instances");
    }
    const book_instance = await BookInstanceService.getBookInstanceDetails(id);
    if (book_instance === null) {
      req.flash("error", req.t('bookinstance.not_found'));
      return res.redirect("/book-instances");
    }
    res.render("book_instances/details", {
      book_instance,
      book_instance_status: BookInstanceStatus,
    });
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
