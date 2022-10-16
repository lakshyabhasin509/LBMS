const { getPrivateBooks_serv, addBookToUserList_serv } = require("../services/private");
const { errorHandler } = require("./error_handler");

async function getPrivateBooks_ctrl(req, res, next) {
  try {
    const books = await getPrivateBooks_serv(req);
    if (!books.length) return res.sendStatus(404);
    return res.status(200).send(books);
  } catch (error) {
    errorHandler(res, error);
  }
}

async function addBookToUserList_ctrl(req, res, next) {
  try {
    const book = await addBookToUserList_serv(req);
    return res.status(201).send(book);
  } catch (error) {
    errorHandler(res, error);
  }
}

module.exports = {
  getPrivateBooks_ctrl,
  addBookToUserList_ctrl,
};
