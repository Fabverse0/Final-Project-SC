import express from "express";
import {showAllBooksController, showAllBooksByGenreController, showBookByIdController, createBookController, updateBookController, deleteBookController } from "../controller/controller.js";
const router = express.Router()

router.get("/books", showAllBooksController);
router.get("/booksG", showAllBooksByGenreController);
router.get("/books/:id", showBookByIdController);
router.post("/books", createBookController);
router.patch("/books/:id", updateBookController);
router.delete("/books/:id", deleteBookController);

export default router;