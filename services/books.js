const Book = require("../model/Book");
const APIPerReqDefaultLimit = 20;

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
  const queries = req.query;
  let {Limit, Skip} = queries;
  Limit = Limit? parseInt(Limit): APIPerReqDefaultLimit;
  Skip = Skip? parseInt(Skip): 0;
  const books = await Book.find({ isPublic: true }).skip(Skip).limit(Limit);
  return books;
}

module.exports = {
  addBook_serv,
  getBooks_serv,
};
