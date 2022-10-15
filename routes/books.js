const router = require("express").Router();
const { addBook_ctrl, getBooks_ctrl } = require("../controllers/books");
const authorized = require("../middleWare");

router.post("/add", authorized, addBook_ctrl);
router.get("/", getBooks_ctrl);

module.exports = router;
