const { addBook_serv, getBooks_serv } = require("../services/books");
const { errorHandler } = require("./error_handler");

async function addBook_ctrl(req, res, next) {
  try {
    const newBook = await addBook_serv(req);
    return res.status(201).send(newBook);
  } catch (error) {
    errorHandler(res, error);
  }
}   

async function getBooks_ctrl(req, res, next) {
  try {
    const books = await getBooks_serv(req);
    if (!books.length) return res.sendStatus(404);
    return res.status(200).send(books);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
}

module.exports = { addBook_ctrl, getBooks_ctrl };
