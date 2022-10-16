const router = require("express").Router();
const {
  getPrivateBooks_ctrl,
  addBookToUserList_ctrl,
} = require("../controllers/private");
const authorized = require("../middleWare");

router.get("/books", authorized, getPrivateBooks_ctrl);
router.patch("/add/book", authorized, addBookToUserList_ctrl);

module.exports = router;
