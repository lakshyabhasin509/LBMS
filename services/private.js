const User = require("../model/User");
const Book = require("../model/Book");

async function getPrivateBooks_serv(req) {
  const books = Book.find({ username: req.username });
  return books;
}

async function addBookToUserList_serv(req) {
  var objBook = { bookId: req.body.bookId, isPublic: req.body.isPublic };
  if (!objBook.bookId) throw new Error("Not book ID specified", { cause: 400 });
  const bookArrayAdd = await User.findOneAndUpdate(
    { name: req.username },
    { $push: { books: objBook } }
  );
  return objBook;
}

module.exports = {
  getPrivateBooks_serv,
  addBookToUserList_serv,
};
