import {
    showAllBooks,
    showAllBookByGenre,
    showBookById,
    createBook,
    updateBook,
    deleteBook
} from "../services/userServices.js";

async function showAllBooksController(req, res) {
    try {
        const books = await showAllBooks();
        if(books.length === 0) {
            return res.status(404).json({ message: "No books found"});
        }
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function showAllBooksByGenreController(req, res) {
    try {
        const filters = req.query || {};
        const books = await showAllBookByGenre(filters);
        if(books.length === 0) {
            return res.status(404).json({ message: "No books found"});
        }
        return res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function showBookByIdController(req,res) {
    try {
        const book = await showBookById(req.params.id);
        res.status(200).json(book);
    } catch (error) {
        if (error.message === "Book not found") {
            res.status(404).json({ message: error.message });
        }
        res.status(500).json({ message: error.message });
    }
}

async function createBookController(req,res) {

    const body = req.body || {};
    const { isbn, title, author, year, genre, publisher } = body;

  if ([isbn, title, author, year, genre, publisher].some(v => v == null || v === "")) {
    return res.status(400).json({ 
      message: "isbn, title, author, year, genre and publisher are required" 
    });
  }

  const payload = {
    isbn,
    title,
    author,
    year,
    genre,
    publisher
  };

  try {
    const newBook = await createBook(payload);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}


async function updateBookController(req,res) {
    const {isbn, title, author, year, genre, publisher} = req.body;
    if(!isbn || !title || !author || !year || !genre || !publisher) {
        return res.status(400).json({ message: "isbn, title, author, year, genre and publisher are requires" });
    }
    try {
     const updatedBook = await updateBook(req.params.id, req.body);
     res.status(200).json(updatedBook);
    } catch (error) {
        if (error.message === "Book not found") {
            res.status(404).json({ message: error.message});
        } else {
            res.status(500).json({ message: error.message});
        }
    }
}

async function deleteBookController(req, res) {
    try {
        const deletedBook = await deleteBook(req.params.id);
        res.status(200).json({message: "Book deleted successfully", book: deletedBook});
    } catch (error) {
        if(error.message === "Book not found") {
            res.status(404).json({ message: error.message});
        } else {
            res.status(404).json({ message: error.message});
        }

    }
}
    
export { showAllBooksController, showAllBooksByGenreController, showBookByIdController, createBookController, updateBookController, deleteBookController };