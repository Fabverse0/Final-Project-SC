import listBooks from "../data.js";

async function showAllBooks() {
    return listBooks;
}

async function showAllBookByGenre(filters) {
    if (!filters || Object.keys(filters).length === 0){
        return listBooks;
    }
const q = String(filters.genre).toLowerCase().trim();    
const result = listBooks.filter(book => {
    const bookGenre = (book.genre || "").toString().toLowerCase().trim();
    return bookGenre.includes(q);
  });
 
  return result;
}

async function showBookById(id) {
    const bookId = parseInt(id);
    const book = listBooks.find((b)=> b.id === bookId);
    if(!book) {
        throw new Error("Book not found");
    }
    return book;
}


async function createBook(payload) {

    const newBook = {
        id: listBooks.length + 1,
        isbn: payload.isbn,
        title: payload.title,
        author: payload.author,
        year: payload.year,
        genre: payload.genre,
        publisher: payload.publisher
    };

    listBooks.push(newBook);
    return newBook;
}


async function updateBook(id, dataBook) {
    const bookId = parseInt(id);
    const bookIndex = listBooks.findIndex((bs) => bs.id === bookId);
    if(bookIndex === -1) {
        throw new Error("Book not found");
    }
    listBooks[bookIndex].isbn = dataBook.isbn || listBooks[bookIndex].isbn;
    listBooks[bookIndex].title = dataBook.title || listBooks[bookIndex].title;
    listBooks[bookIndex].author = dataBook.author || listBooks[bookIndex].author;
    listBooks[bookIndex].year = dataBook.year || listBooks[bookIndex].year;
    listBooks[bookIndex].genre = dataBook.genre || listBooks[bookIndex].genre;
    listBooks[bookIndex].publisher = dataBook.publisher || listBooks[bookIndex].publisher;
    return listBooks[bookIndex];
}

async function deleteBook(id) {
    const bookId = parseInt(id);
    const bookIndex = listBooks.findIndex((bk) => bk.id === bookId);
    if (bookIndex === -1) {
        throw new Error("Book not found");
    }
    const deleteBook = listBooks.splice(bookIndex, 1);
    return deleteBook[0];
}
    
export { showAllBooks, showAllBookByGenre, showBookById, createBook, updateBook, deleteBook };