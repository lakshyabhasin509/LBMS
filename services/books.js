const Book = require("../model/Book");

async function addBook_serv(req) {
  if (!req.body.bookName) throw new Error("Book must have a name", { cause: 400 });
  const book = new Book({
    username: req.username,
    bookName: req.body.bookName,
    pdfUrl: req.body.pdfUrl,
    isPublic: req.body.isPublic,
  });
  const existingBook = await Book.findOne({ pdfUrl: book.pdfUrl });
  if (existingBook) throw new Error("This book already exist", { cause: 400 });
  const savedBook = await book.save();
  return savedBook;
}

async function getBooks_serv(req) {
  const books = Book.find({ isPublic: true });
  return books;
}

module.exports = {
  addBook_serv,
  getBooks_serv,
};
